import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import passport from "./auth/passport-config";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { initializeIndexNow } from "./services/indexNowService";

// Crash handlers - log exact error before death
process.on("unhandledRejection", (r) => console.error("[CRASH] unhandledRejection", r));
process.on("uncaughtException", (e) => console.error("[CRASH] uncaughtException", e));

// Memory monitoring - log every 30 seconds
setInterval(() => {
  const m = process.memoryUsage();
  console.log("[MEM]", {
    rss: Math.round(m.rss / 1024 / 1024) + "MB",
    heapUsed: Math.round(m.heapUsed / 1024 / 1024) + "MB",
    heapTotal: Math.round(m.heapTotal / 1024 / 1024) + "MB",
  });
}, 30000);

const app = express();

// Health check endpoints MUST be defined BEFORE any middleware
// This ensures Cloud Run health checks pass even during slow initialization
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Bot/scanner probe blocking - MUST be before all other middleware
app.use((req, res, next) => {
  const p = req.path.toLowerCase();
  
  // Block common scanner probes that waste resources and pollute logs
  if (
    p.includes(".env") ||
    p.includes(".git") ||
    p.endsWith(".php") ||
    p.includes("wp-") ||
    p.includes("wp-admin") ||
    p.includes("wordpress") ||
    p.includes("passwd") ||
    p.includes("config.") ||
    p.includes(".sql") ||
    p.includes(".bak") ||
    p.includes("phpmyadmin") ||
    p.includes("admin.php") ||
    p.includes("xmlrpc")
  ) {
    console.log(`[BOT BLOCKED] ${req.method} ${req.path} from ${req.ip}`);
    return res.status(404).send("Not found");
  }
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PgSession = ConnectPgSimple(session);

app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "agent_sessions",
      createTableIfMissing: false,
    }),
    secret: process.env.SESSION_SECRET || "casurance-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Serve uploaded media files
  app.use("/assets/uploads", express.static("attached_assets/uploads"));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    
    // IndexNow submission only runs when manually triggered via RUN_INDEXNOW=true
    if (process.env.RUN_INDEXNOW === "true") {
      setTimeout(() => {
        initializeIndexNow();
      }, 5000);
    }
  });
})();

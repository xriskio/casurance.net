import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { db } from "../db";
import { agents } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { Agent } from "@shared/schema";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const agent = await db
          .select()
          .from(agents)
          .where(eq(agents.email, email.toLowerCase()))
          .limit(1);

        if (agent.length === 0) {
          return done(null, false, { message: "Invalid email or password" });
        }

        const user = agent[0];
        const isValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isValid) {
          return done(null, false, { message: "Invalid email or password" });
        }

        await db
          .update(agents)
          .set({ lastLoginAt: new Date() })
          .where(eq(agents.id, user.id));

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as Agent).id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const agent = await db
      .select()
      .from(agents)
      .where(eq(agents.id, id))
      .limit(1);

    if (agent.length === 0) {
      return done(null, false);
    }

    done(null, agent[0]);
  } catch (error) {
    done(error);
  }
});

export default passport;

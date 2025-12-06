const INDEXNOW_KEY = process.env.INDEXNOW_API_KEY || "78eb96aa6f124ceb81a5fbaf32694bd0";
const BING_API_KEY = process.env.BING_WEBMASTER_API_KEY || "";
const HOST = "www.casurance.net";
const SITE_URL = `https://${HOST}`;
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

const ALL_SITE_URLS = [
  "/",
  "/about",
  "/contact",
  "/quote",
  "/quote/thank-you",
  "/service-request",
  "/coverages",
  "/industries",
  "/blog",
  "/press-releases",
  "/get-quote",
  "/workers-comp-california-nevada",
  "/personal-lines",
  "/locations",
  "/middle-market",
  
  "/coverage/commercial-auto",
  "/coverage/general-liability",
  "/coverage/workers-compensation",
  "/coverage/commercial-property",
  "/coverage/builders-risk",
  "/coverage/professional-liability",
  "/coverage/cyber-liability",
  "/coverage/employment-practices",
  "/coverage/habitational",
  "/coverage/hotel-motel",
  "/coverage/restaurant",
  "/coverage/trucking",
  "/coverage/ocean-cargo",
  "/coverage/self-storage",
  "/coverage/film-production",
  "/coverage/product-liability",
  "/coverage/security-services",
  "/coverage/vacant-building",
  "/coverage/crane-riggers",
  "/coverage/commercial-flood",
  "/coverage/commercial-earthquake",
  "/coverage/violent-attack",
  "/coverage/religious-organization",
  
  "/industry/golf-country-club",
  "/industry/auto-dealer-garage",
  "/industry/franchised-dealers",
  "/industry/garage-service-centers",
  "/industry/public-transportation",
  "/industry/public-self-storage",
  "/industry/nemt-paratransit",
  "/industry/limousine-transportation",
  
  "/quote/commercial-auto",
  "/quote/general-liability",
  "/quote/workers-compensation",
  "/quote/commercial-property",
  "/quote/builders-risk",
  "/quote/professional-liability",
  "/quote/habitational",
  "/quote/office-building",
  "/quote/hotel",
  "/quote/restaurant",
  "/quote/trucking",
  "/quote/golf-country-club",
  "/quote/personal-lines",
  "/quote/cyber-liability",
  "/quote/employment-practices",
  "/quote/ocean-cargo",
  "/quote/self-storage",
  "/quote/film-production",
  "/quote/product-liability",
  "/quote/security-services",
  "/quote/vacant-building",
  "/quote/crane-riggers",
  "/quote/religious-organization",
  "/quote/construction-casualty",
  "/quote/limousine",
  "/quote/public-transportation",
  "/quote/taxi",
  "/quote/tnc",
  "/quote/shared-economy",
  "/quote/high-value-home",
  "/quote/commercial-flood",
  "/quote/commercial-earthquake",
  "/quote/franchised-dealers",
  "/quote/garage-service-centers",
  "/quote/auto-dealer-garage",
  "/quote/violent-attack",
  
  "/apply/nemt",
  "/apply/ambulance",
  "/apply/tnc-rideshare",
  
  "/lp/workers-comp",
  "/lp/workers-compensation",
  "/lp/commercial-insurance",
  "/lp/insurance",
  
  "/location/california/los-angeles",
  "/location/california/san-francisco",
  "/location/california/san-diego",
  "/location/california/san-jose",
  "/location/california/fresno",
  "/location/california/sacramento",
  "/location/california/long-beach",
  "/location/california/oakland",
  "/location/california/bakersfield",
  "/location/california/anaheim",
  "/location/california/santa-ana",
  "/location/california/riverside",
  "/location/california/stockton",
  "/location/california/irvine",
  "/location/california/chula-vista",
  "/location/california/fremont",
  "/location/california/modesto",
  "/location/california/fontana",
  "/location/california/moreno-valley",
  "/location/california/glendale",
  "/location/california/huntington-beach",
  "/location/california/santa-clarita",
  "/location/california/garden-grove",
  "/location/california/oceanside",
  "/location/california/rancho-cucamonga",
  "/location/california/ontario",
  "/location/california/santa-rosa",
  "/location/california/elk-grove",
  "/location/california/corona",
  "/location/california/lancaster",
  "/location/california/palmdale",
  "/location/california/salinas",
  "/location/california/pomona",
  "/location/california/escondido",
  "/location/california/torrance",
  "/location/california/pasadena",
  "/location/california/orange",
  "/location/california/fullerton",
  "/location/california/thousand-oaks",
  "/location/california/roseville",
  "/location/california/concord",
  "/location/california/simi-valley",
  "/location/california/santa-clara",
  "/location/california/victorville",
  "/location/california/vallejo",
  "/location/california/berkeley",
  "/location/california/el-monte",
  "/location/california/downey",
  "/location/california/costa-mesa",
  "/location/california/inglewood",
  "/location/california/carlsbad",
  "/location/california/san-buenaventura",
  "/location/california/fairfield",
  "/location/california/west-covina",
  "/location/california/murrieta",
  "/location/california/richmond",
  "/location/california/norwalk",
  "/location/california/antioch",
  "/location/california/temecula",
  "/location/california/burbank",
  "/location/california/daly-city",
  "/location/california/rialto",
  "/location/california/el-cajon",
  "/location/california/san-mateo",
  "/location/california/clovis",
  "/location/california/compton",
  "/location/california/jurupa-valley",
  "/location/california/vista",
  "/location/california/south-gate",
  "/location/california/mission-viejo",
  "/location/california/vacaville",
  "/location/california/carson",
  "/location/california/hesperia",
  "/location/california/santa-maria",
  "/location/california/redding",
  "/location/california/westminster",
  "/location/california/santa-barbara",
  "/location/california/chico",
  "/location/california/newport-beach",
  "/location/california/san-leandro",
  "/location/california/san-marcos",
  "/location/california/whittier",
  "/location/california/hawthorne",
  "/location/california/citrus-heights",
  "/location/california/alhambra",
  "/location/california/tracy",
  "/location/california/livermore",
  "/location/california/buena-park",
  "/location/california/menifee",
  "/location/california/hemet",
  "/location/california/lakewood",
  "/location/california/merced",
  "/location/california/chino",
  "/location/california/indio",
  "/location/california/redwood-city",
  "/location/california/lake-forest",
  "/location/california/napa",
  "/location/california/tustin",
  "/location/california/bellflower",
  "/location/california/mountain-view",
  "/location/california/chino-hills",
  "/location/california/baldwin-park",
  "/location/california/alameda",
  "/location/california/upland",
  "/location/california/san-ramon",
  "/location/california/folsom",
  "/location/california/pleasanton",
  "/location/california/lynwood",
  "/location/california/union-city",
  "/location/california/apple-valley",
  "/location/california/redlands",
  "/location/california/turlock",
  "/location/california/perris",
  "/location/california/manteca",
  "/location/california/milpitas",
  "/location/california/redondo-beach",
  "/location/california/davis",
  "/location/california/camarillo",
  "/location/california/yuba-city",
  "/location/california/rancho-cordova",
  "/location/california/palo-alto",
  "/location/california/yorba-linda",
  "/location/california/walnut-creek",
  "/location/california/south-san-francisco",
  "/location/california/san-clemente",
  "/location/california/pittsburg",
  "/location/california/montebello",
  "/location/california/pico-rivera",
  "/location/california/santa-cruz",
  "/location/california/la-habra",
  "/location/california/encinitas",
  "/location/california/tulare",
  "/location/california/monterey-park",
  "/location/california/lodi",
  "/location/california/madera",
  "/location/california/santa-monica",
  "/location/california/la-mesa",
  "/location/california/gilroy",
  "/location/california/national-city",
  "/location/california/san-rafael",
  "/location/california/lake-elsinore",
  "/location/california/la-mirada",
  "/location/california/highland",
  "/location/california/glendora",
  "/location/california/diamond-bar",
  "/location/california/rowland-heights",
  "/location/california/novato",
  "/location/california/brentwood",
  "/location/california/colton",
  "/location/california/cathedral-city",
  "/location/california/delano",
  "/location/california/yucaipa",
  "/location/california/azusa",
  "/location/california/san-luis-obispo",
  "/location/california/cerritos",
  "/location/california/ceres",
  "/location/california/palm-desert",
  "/location/california/cypress",
  "/location/california/covina",
  "/location/california/beaumont",
  "/location/california/cupertino",
  "/location/california/gardena",
  "/location/california/petaluma",
  "/location/california/paramount",
  "/location/california/rocklin",
  "/location/california/porterville",
  "/location/california/santee",
  "/location/california/eastvale",
  "/location/california/rosemead",
  "/location/california/hanford",
  "/location/california/bell-gardens",
  "/location/california/arcadia",
  "/location/california/san-jacinto",
  "/location/california/fountain-valley",
  "/location/california/palm-springs",
  "/location/california/woodland",
  "/location/california/dublin",
  "/location/california/la-quinta",
  "/location/california/brea",
  "/location/california/la-puente",
  "/location/california/west-sacramento",
  "/location/california/morgan-hill",
  "/location/california/san-bruno",
  "/location/california/campbell",
  "/location/california/coachella",
  "/location/california/monrovia",
  "/location/california/lincoln",
  "/location/california/culver-city",
  "/location/california/stanton",
  "/location/california/la-verne",
  "/location/california/watsonville",
  "/location/california/oakley",
  "/location/california/martinez",
  "/location/california/san-gabriel",
  "/location/california/lompoc",
  "/location/california/danville",
  "/location/california/temple-city",
  
  "/location/nevada/las-vegas",
  "/location/nevada/henderson",
  "/location/nevada/reno",
  "/location/nevada/north-las-vegas",
  "/location/nevada/sparks",
  "/location/nevada/carson-city",
  "/location/nevada/fernley",
  "/location/nevada/elko",
  "/location/nevada/mesquite",
  "/location/nevada/boulder-city",
  "/location/nevada/fallon",
  "/location/nevada/winnemucca",
  "/location/nevada/west-wendover",
  "/location/nevada/ely",
  "/location/nevada/yerington",
  "/location/nevada/carlin",
  "/location/nevada/lovelock",
  "/location/nevada/wells",
  "/location/nevada/caliente",
];

interface SubmissionResult {
  success: boolean;
  statusCode?: number;
  message: string;
}

async function submitToBingWebmaster(urls: string[]): Promise<SubmissionResult> {
  if (!BING_API_KEY) {
    return { success: false, message: "Bing Webmaster API key not configured" };
  }

  if (urls.length === 0) {
    return { success: false, message: "No URLs provided" };
  }

  const fullUrls = urls.map(url => {
    if (url.startsWith("http")) {
      return url;
    }
    return `${SITE_URL}${url.startsWith("/") ? url : "/" + url}`;
  });

  const payload = {
    siteUrl: SITE_URL,
    urlList: fullUrls
  };

  try {
    const response = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json; charset=utf-8",
          "User-Agent": "Casurance-Bot/1.0"
        },
        body: JSON.stringify(payload)
      }
    );

    let responseBody = "";
    try {
      responseBody = await response.text();
    } catch {}

    if (response.status !== 200) {
      console.log(`[Bing Webmaster API] Status: ${response.status}, Response: ${responseBody.substring(0, 200)}`);
    }

    return {
      success: response.status === 200,
      statusCode: response.status,
      message: response.status === 200 
        ? `Successfully submitted ${fullUrls.length} URL(s) to Bing Webmaster` 
        : `Bing status ${response.status}: ${responseBody.substring(0, 100)}`
    };
  } catch (error) {
    console.error("[Bing Webmaster API] Error:", error);
    return {
      success: false,
      message: `Error submitting to Bing Webmaster: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}

async function submitToBingContentSubmissionAPI(urls: string[]): Promise<SubmissionResult> {
  if (!BING_API_KEY) {
    return { success: false, message: "Bing API key not configured" };
  }

  if (urls.length === 0) {
    return { success: false, message: "No URLs provided" };
  }

  const fullUrls = urls.map(url => {
    if (url.startsWith("http")) {
      return url;
    }
    return `${SITE_URL}${url.startsWith("/") ? url : "/" + url}`;
  });

  try {
    const response = await fetch(
      `https://www.bing.com/indexnow?url=${encodeURIComponent(fullUrls[0])}&key=${INDEXNOW_KEY}`,
      {
        method: "GET",
        headers: { 
          "User-Agent": "Casurance-Bot/1.0"
        }
      }
    );

    return {
      success: response.status === 200 || response.status === 202,
      statusCode: response.status,
      message: response.status === 200 || response.status === 202
        ? `Successfully notified Bing via IndexNow` 
        : `Bing IndexNow returned status ${response.status}`
    };
  } catch (error) {
    console.error("[Bing IndexNow] Error:", error);
    return {
      success: false,
      message: `Error notifying Bing: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}

async function submitToIndexNow(urls: string[]): Promise<SubmissionResult> {
  if (urls.length === 0) {
    return { success: false, message: "No URLs provided" };
  }

  const fullUrls = urls.map(url => {
    if (url.startsWith("http")) {
      return url;
    }
    return `${SITE_URL}${url.startsWith("/") ? url : "/" + url}`;
  });

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: fullUrls
  };

  try {
    const [indexNowResponse, yandexResponse] = await Promise.all([
      fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload)
      }),
      fetch("https://yandex.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload)
      })
    ]);

    const results = {
      indexNow: indexNowResponse.status,
      yandex: yandexResponse.status
    };

    console.log(`[IndexNow] Results - IndexNow: ${results.indexNow}, Yandex: ${results.yandex}`);

    const success = results.indexNow === 200 || results.indexNow === 202 ||
                    results.yandex === 200 || results.yandex === 202;

    return {
      success,
      statusCode: results.indexNow,
      message: success 
        ? `Successfully submitted ${fullUrls.length} URL(s) to IndexNow/Yandex` 
        : `IndexNow submission returned status ${results.indexNow}`
    };
  } catch (error) {
    console.error("[IndexNow] Error submitting URLs:", error);
    return {
      success: false,
      message: `Error submitting to IndexNow: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}

export async function submitAllSitePages(): Promise<void> {
  console.log("[URL Submission] Starting automatic submission of all site pages...");
  console.log(`[URL Submission] IndexNow API key: ${INDEXNOW_KEY}`);
  console.log(`[URL Submission] Total URLs to submit: ${ALL_SITE_URLS.length}`);
  
  const indexNowBatchSize = 100;
  
  console.log("[URL Submission] Submitting to IndexNow (Bing, Yandex, and other participating search engines)...");
  let indexNowSuccessCount = 0;
  
  for (let i = 0; i < ALL_SITE_URLS.length; i += indexNowBatchSize) {
    const batch = ALL_SITE_URLS.slice(i, i + indexNowBatchSize);
    const batchNum = Math.floor(i / indexNowBatchSize) + 1;
    
    const result = await submitToIndexNow(batch);
    if (result.success) {
      indexNowSuccessCount += batch.length;
    }
    console.log(`[IndexNow] Batch ${batchNum}: ${result.message}`);
    
    if (i + indexNowBatchSize < ALL_SITE_URLS.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log("[URL Submission] Submitting directly to Bing IndexNow endpoint...");
  const bingIndexNowResult = await submitBatchToBingIndexNow(ALL_SITE_URLS.slice(0, 100));
  console.log(`[Bing IndexNow] ${bingIndexNowResult.message}`);
  
  if (BING_API_KEY) {
    console.log("[URL Submission] Testing Bing Webmaster API with sample URLs...");
    const testResult = await submitToBingWebmaster(ALL_SITE_URLS.slice(0, 5));
    
    if (testResult.success) {
      console.log("[Bing Webmaster] API working! Submitting remaining URLs...");
      let successCount = 5;
      const bingBatchSize = 10;
      
      for (let i = 5; i < ALL_SITE_URLS.length; i += bingBatchSize) {
        const batch = ALL_SITE_URLS.slice(i, i + bingBatchSize);
        const result = await submitToBingWebmaster(batch);
        if (result.success) {
          successCount += batch.length;
        }
        
        if (i + bingBatchSize < ALL_SITE_URLS.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      console.log(`[Bing Webmaster] Completed: ${successCount} URLs submitted successfully`);
    } else {
      console.log(`[Bing Webmaster] API not available (requires site verification in Bing Webmaster Tools). Using IndexNow for Bing indexing instead.`);
    }
  }
  
  console.log(`[URL Submission] Completed! ${indexNowSuccessCount} URLs submitted via IndexNow to Bing, Yandex, and other search engines`);
}

async function submitBatchToBingIndexNow(urls: string[]): Promise<SubmissionResult> {
  const fullUrls = urls.map(url => {
    if (url.startsWith("http")) {
      return url;
    }
    return `${SITE_URL}${url.startsWith("/") ? url : "/" + url}`;
  });

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: fullUrls
  };

  try {
    const response = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "Casurance-Bot/1.0"
      },
      body: JSON.stringify(payload)
    });

    return {
      success: response.status === 200 || response.status === 202,
      statusCode: response.status,
      message: response.status === 200 || response.status === 202
        ? `Successfully submitted ${fullUrls.length} URLs directly to Bing IndexNow` 
        : `Bing IndexNow returned status ${response.status} (key verification required in production)`
    };
  } catch (error) {
    console.error("[Bing IndexNow] Error:", error);
    return {
      success: false,
      message: `Error submitting to Bing IndexNow: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}

export function initializeIndexNow(): void {
  setTimeout(() => {
    submitAllSitePages().catch(err => {
      console.error("[URL Submission] Failed to submit site pages:", err);
    });
  }, 10000);
}

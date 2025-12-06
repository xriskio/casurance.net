const INDEXNOW_KEY = "9afc113c446e4795861d72a66b4f22c0";
const HOST = "www.casurance.net";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

interface IndexNowResult {
  success: boolean;
  statusCode?: number;
  message: string;
}

export async function submitUrlToIndexNow(url: string): Promise<IndexNowResult> {
  return submitUrlsToIndexNow([url]);
}

export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResult> {
  if (urls.length === 0) {
    return { success: false, message: "No URLs provided" };
  }

  const fullUrls = urls.map(url => {
    if (url.startsWith("http")) {
      return url;
    }
    return `https://${HOST}${url.startsWith("/") ? url : "/" + url}`;
  });

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: fullUrls
  };

  console.log(`[IndexNow] Submitting ${fullUrls.length} URL(s) to search engines...`);

  try {
    const [indexNowResponse, bingResponse, yandexResponse] = await Promise.all([
      fetch("https://api.indexnow.org/IndexNow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload)
      }),
      fetch("https://www.bing.com/indexnow", {
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
      bing: bingResponse.status,
      yandex: yandexResponse.status
    };

    console.log(`[IndexNow] Results - IndexNow: ${results.indexNow}, Bing: ${results.bing}, Yandex: ${results.yandex}`);
    console.log(`[IndexNow] URLs submitted:`, fullUrls);

    const success = results.indexNow === 200 || results.indexNow === 202 ||
                    results.bing === 200 || results.bing === 202;

    return {
      success,
      statusCode: results.indexNow,
      message: success 
        ? `Successfully submitted ${fullUrls.length} URL(s) to IndexNow` 
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

export function notifyBlogPostCreated(slug: string): void {
  submitUrlToIndexNow(`/blog/${slug}`).catch(err => 
    console.error("[IndexNow] Failed to notify blog post creation:", err)
  );
}

export function notifyBlogPostUpdated(slug: string): void {
  submitUrlToIndexNow(`/blog/${slug}`).catch(err => 
    console.error("[IndexNow] Failed to notify blog post update:", err)
  );
}

export function notifyPressReleaseCreated(slug: string): void {
  submitUrlsToIndexNow([
    `/press-release/${slug}`,
    `/press-releases`
  ]).catch(err => 
    console.error("[IndexNow] Failed to notify press release creation:", err)
  );
}

export function notifyPressReleaseUpdated(slug: string): void {
  submitUrlToIndexNow(`/press-release/${slug}`).catch(err => 
    console.error("[IndexNow] Failed to notify press release update:", err)
  );
}

export function notifyCmsPageCreated(slug: string): void {
  submitUrlToIndexNow(`/page/${slug}`).catch(err => 
    console.error("[IndexNow] Failed to notify CMS page creation:", err)
  );
}

export function notifyCmsPageUpdated(slug: string): void {
  submitUrlToIndexNow(`/page/${slug}`).catch(err => 
    console.error("[IndexNow] Failed to notify CMS page update:", err)
  );
}

export function notifyPageUpdated(path: string): void {
  submitUrlToIndexNow(path).catch(err => 
    console.error("[IndexNow] Failed to notify page update:", err)
  );
}

export async function submitAllSitemapUrls(): Promise<IndexNowResult> {
  const urls = [
    "/",
    "/about",
    "/contact",
    "/quote",
    "/service-request",
    "/coverages",
    "/industries",
    "/blog",
    "/press-releases",
    "/get-quote",
    "/workers-comp-california-nevada",
    "/personal-lines",
    "/locations",
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
    "/quote/hotel",
    "/quote/restaurant",
    "/quote/trucking",
    "/quote/golf-country-club",
    "/quote/personal-lines",
    "/location/california/los-angeles",
    "/location/california/san-francisco",
    "/location/california/san-diego",
    "/location/nevada/las-vegas",
    "/location/nevada/reno"
  ];

  return submitUrlsToIndexNow(urls);
}

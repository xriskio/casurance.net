const INDEXNOW_KEY = "9afc113c446e4795861d72a66b4f22c0";
const HOST = "www.casurance.net";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const urls = [
  "https://www.casurance.net/",
  "https://www.casurance.net/about",
  "https://www.casurance.net/contact",
  "https://www.casurance.net/quote",
  "https://www.casurance.net/service-request",
  "https://www.casurance.net/coverages",
  "https://www.casurance.net/industries",
  "https://www.casurance.net/industry/golf-country-club",
  "https://www.casurance.net/industry/auto-dealer-garage",
  "https://www.casurance.net/industry/franchised-dealers",
  "https://www.casurance.net/industry/garage-service-centers",
  "https://www.casurance.net/industry/public-transportation",
  "https://www.casurance.net/industry/public-self-storage",
  "https://www.casurance.net/industry/nemt-paratransit",
  "https://www.casurance.net/industry/limousine-transportation",
  "https://www.casurance.net/blog",
  "https://www.casurance.net/press-releases",
  "https://www.casurance.net/get-quote",
  "https://www.casurance.net/workers-comp-california-nevada",
  "https://www.casurance.net/lp/workers-comp",
  "https://www.casurance.net/lp/commercial-insurance",
  "https://www.casurance.net/personal-lines",
  "https://www.casurance.net/locations",
  "https://www.casurance.net/coverage/commercial-auto",
  "https://www.casurance.net/coverage/general-liability",
  "https://www.casurance.net/coverage/workers-compensation",
  "https://www.casurance.net/coverage/commercial-property",
  "https://www.casurance.net/coverage/builders-risk",
  "https://www.casurance.net/coverage/professional-liability",
  "https://www.casurance.net/coverage/cyber-liability",
  "https://www.casurance.net/coverage/employment-practices",
  "https://www.casurance.net/coverage/ocean-cargo",
  "https://www.casurance.net/coverage/habitational",
  "https://www.casurance.net/coverage/hotel-motel",
  "https://www.casurance.net/coverage/restaurant",
  "https://www.casurance.net/coverage/trucking",
  "https://www.casurance.net/coverage/vacant-building",
  "https://www.casurance.net/coverage/crane-riggers",
  "https://www.casurance.net/coverage/film-production",
  "https://www.casurance.net/coverage/security-services",
  "https://www.casurance.net/coverage/product-liability",
  "https://www.casurance.net/coverage/commercial-flood",
  "https://www.casurance.net/coverage/commercial-earthquake",
  "https://www.casurance.net/coverage/california-fair-plan",
  "https://www.casurance.net/quote/commercial-auto",
  "https://www.casurance.net/quote/general-liability",
  "https://www.casurance.net/quote/workers-compensation",
  "https://www.casurance.net/quote/commercial-property",
  "https://www.casurance.net/quote/builders-risk",
  "https://www.casurance.net/quote/professional-liability",
  "https://www.casurance.net/quote/habitational",
  "https://www.casurance.net/quote/hotel",
  "https://www.casurance.net/quote/restaurant",
  "https://www.casurance.net/quote/trucking",
  "https://www.casurance.net/quote/vacant-building",
  "https://www.casurance.net/quote/cyber-liability",
  "https://www.casurance.net/quote/employment-practices",
  "https://www.casurance.net/quote/ocean-cargo",
  "https://www.casurance.net/quote/self-storage",
  "https://www.casurance.net/quote/film-production",
  "https://www.casurance.net/quote/security-services",
  "https://www.casurance.net/quote/product-liability",
  "https://www.casurance.net/quote/commercial-flood",
  "https://www.casurance.net/quote/commercial-earthquake",
  "https://www.casurance.net/quote/golf-country-club",
  "https://www.casurance.net/quote/limousine",
  "https://www.casurance.net/quote/taxi",
  "https://www.casurance.net/quote/tnc",
  "https://www.casurance.net/quote/public-transportation",
  "https://www.casurance.net/quote/high-value-home",
  "https://www.casurance.net/quote/personal-lines",
  "https://www.casurance.net/quote/fair-plan",
  "https://www.casurance.net/location/california/los-angeles",
  "https://www.casurance.net/location/california/san-francisco",
  "https://www.casurance.net/location/california/san-diego",
  "https://www.casurance.net/location/california/san-jose",
  "https://www.casurance.net/location/california/fresno",
  "https://www.casurance.net/location/california/sacramento",
  "https://www.casurance.net/location/california/long-beach",
  "https://www.casurance.net/location/california/oakland",
  "https://www.casurance.net/location/california/bakersfield",
  "https://www.casurance.net/location/california/anaheim",
  "https://www.casurance.net/location/california/santa-ana",
  "https://www.casurance.net/location/california/riverside",
  "https://www.casurance.net/location/california/stockton",
  "https://www.casurance.net/location/california/irvine",
  "https://www.casurance.net/location/nevada/las-vegas",
  "https://www.casurance.net/location/nevada/henderson",
  "https://www.casurance.net/location/nevada/reno",
  "https://www.casurance.net/location/nevada/north-las-vegas",
  "https://www.casurance.net/location/nevada/sparks",
  "https://www.casurance.net/location/nevada/carson-city",
];

async function submitToIndexNow() {
  console.log(`Submitting ${urls.length} URLs to IndexNow...`);
  console.log(`Host: ${HOST}`);
  console.log(`Key Location: ${KEY_LOCATION}`);
  
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    console.log(`\nResponse Status: ${response.status} ${response.statusText}`);
    
    if (response.status === 200) {
      console.log("SUCCESS: All URLs submitted successfully to IndexNow!");
      console.log("\nURLs submitted:");
      urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
    } else if (response.status === 202) {
      console.log("ACCEPTED: URLs accepted for processing.");
    } else {
      const text = await response.text();
      console.log("Response body:", text);
    }

    console.log("\n--- Also submitting to Bing directly ---");
    const bingResponse = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });
    console.log(`Bing Response Status: ${bingResponse.status} ${bingResponse.statusText}`);

    console.log("\n--- Also submitting to Yandex ---");
    const yandexResponse = await fetch("https://yandex.com/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(payload)
    });
    console.log(`Yandex Response Status: ${yandexResponse.status} ${yandexResponse.statusText}`);

  } catch (error) {
    console.error("Error submitting to IndexNow:", error);
  }
}

submitToIndexNow();

import { access, writeFile } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";

const FEED_URL = "https://thefirstderivative.substack.com/feed";
const OUTPUT_URL = new URL("../src/data/substack-posts.json", import.meta.url);

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  trimValues: true,
});

function asText(value) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    return value["#text"] || value.__cdata || "";
  }
  return "";
}

function normalizeItem(item) {
  const date = new Date(asText(item.pubDate));

  return {
    title: asText(item.title),
    description: asText(item.description),
    url: asText(item.link),
    date: Number.isNaN(date.getTime()) ? "" : date.toISOString(),
    image: item.enclosure?.url || "",
  };
}

async function hasExistingFeed() {
  try {
    await access(OUTPUT_URL);
    return true;
  } catch {
    return false;
  }
}

async function syncWritings() {
  try {
    const response = await fetch(FEED_URL, {
      headers: { "user-agent": "kashyab.xyz writing sync" },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Substack returned ${response.status}`);
    }

    const feed = parser.parse(await response.text());
    const rawItems = feed?.rss?.channel?.item || [];
    const items = (Array.isArray(rawItems) ? rawItems : [rawItems])
      .map(normalizeItem)
      .filter((item) => item.title && item.url);

    if (items.length === 0) {
      throw new Error("Substack feed did not contain any posts");
    }

    await writeFile(OUTPUT_URL, `${JSON.stringify(items, null, 2)}\n`);
    console.log(`Synced ${items.length} Substack posts`);
  } catch (error) {
    if (await hasExistingFeed()) {
      console.warn(`Writing sync skipped: ${error.message}. Using the last successful feed.`);
      return;
    }
    throw error;
  }
}

await syncWritings();

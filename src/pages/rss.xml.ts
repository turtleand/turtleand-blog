import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";

const feedUrl = new URL("/rss.xml", SITE.website).href;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const getImageUrl = (image?: string) => {
  if (!image) return undefined;
  return new URL(image, `${SITE.website}/`).href;
};

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  const latestPost = sortedPosts[0];
  const lastBuildDate = latestPost
    ? new Date(latestPost.data.modDatetime ?? latestPost.data.pubDatetime)
    : new Date();

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      dc: "http://purl.org/dc/elements/1.1/",
      media: "http://search.yahoo.com/mrss/",
    },
    customData: [
      "<language>en</language>",
      `<lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>`,
      `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    ].join(""),
    items: sortedPosts.map(({ data }) => {
      const ogImage = typeof data.ogImage === "string" ? data.ogImage : data.ogImage?.src;
      const imageUrl = getImageUrl(ogImage);
      const customData = [
        `<dc:creator>${escapeXml(data.author ?? SITE.author)}</dc:creator>`,
        imageUrl ? `<media:thumbnail url="${escapeXml(imageUrl)}" />` : "",
      ].join("");

      return {
        link: `posts/${data.slug}/`,
        title: data.title,
        description: data.description,
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),
        categories: data.tags ?? [],
        customData,
      };
    }),
  });
}

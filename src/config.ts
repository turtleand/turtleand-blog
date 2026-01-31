import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.turtleand.com",
  author: "Turtleand",
  profile: "https://blog.turtleand.com/about",
  desc: "A strategic thinker's blog on AI, Blockchain, and humanity.",
  title: "Turtleand",
  ogImage: "ogImage-0-0-4.webp",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  editPost: {
    url: "https://github.com/turtlean/turtlean-blog-astro-paper",
    text: "Suggest Changes",
    appendFilePath: true,
  },
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/turtleand",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:hello@turtleand.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
];

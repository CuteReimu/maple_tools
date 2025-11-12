import { hopeTheme } from "vuepress-theme-hope";

import sidebar from "./sidebar.js";
import navbar from "./navbar.js";

export default hopeTheme({
  repo: "https://github.com/CuteReimu/maple_tools",
  docsDir: "src",
  docsBranch: "master",
  hostname: "https://vuepress-theme-hope-docs-demo.netlify.app",

  author: {
    name: "奇葩の灵梦",
    url: "https://github.com/CuteReimu",
  },

  logo: "/images/maplestory.png",
  favicon: "/images/maplestory.png",

  darkmode: "toggle",
  print: false,
  pageInfo: false,
  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Links", "Language", "Repo", "Outlook", "Search"],
  },
  toc: false,
  editLink: false,
  prevLink: false,
  nextLink: false,
  lastUpdated: false,

  navbar,

  sidebar,

  markdown: {
    imgSize: true,
    spoiler: true,
    math: {
      type: "katex",
    },
    // 支持容器
    hint: true,
    chartjs: true,
    linksCheck: {
      build: "error",
    },
  },

  plugins: {
    icon: {
      assets: "fontawesome-with-brands",
    },
    slimsearch: {
      indexContent: true,
      suggestion: true,
    },
    sitemap: false,
    seo: false,

    git: {
      contributors: {
        info: [
          {
            username: "CuteReimu",
            name: "咕一菈",
            alias: ["奇葩の灵梦"],
          },
          {
            username: "github-actions[bot]",
            name: "Github Actions",
            avatar: "https://avatars.githubusercontent.com/in/15368?v=4",
            url: "https://github.com/apps/github-actions",
          },
        ],
        avatar: true,
      }
    },
  },

  copyright: false,
});

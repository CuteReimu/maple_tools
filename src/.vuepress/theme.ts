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

  darkmode: "toggle",
  print: false,
  pageInfo: false,
  navbarLayout: {
    start: ["Brand", "Links"],
    center: [],
    end: ["Language", "Repo", "Outlook", "Search"],
  },
  toc: false,
  breadcrumb: false,
  editLink: false,
  prevLink: false,
  nextLink: false,

  navbar,

  sidebar,

  markdown: {
    // 剧透
    spoiler: true,
    // 使用chart.js
    chartjs: true,
    // 支持容器
    hint: true,
    // 支持数学公式
    math: {
      type: "katex",
    },
    linksCheck: {
      build: "error",
    },
  },

  plugins: {
    icon: {
      assets: "fontawesome",
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
        ],
        avatar: true,
      }
    }
  },

  copyright: false,
});

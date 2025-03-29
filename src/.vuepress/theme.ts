import { hopeTheme } from "vuepress-theme-hope";

import sidebar from "./sidebar.js";
import navbar from "./navbar.js";

import dotenv from 'dotenv';
import * as path2 from "node:path";
dotenv.config({path: path2.resolve(process.cwd(), '.env.local')})
dotenv.config()

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
    // 支持容器
    hint: true,
    linksCheck: {
      build: "error",
    },
  },

  plugins: {
    icon: {
      assets: "fontawesome",
    },
    slimsearch: false,
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
    },

    redirect: {
      config: {
        '/Tools/LegionResolver.html': process.env.VITE_LEGION_URL,
      },
    },
  },

  copyright: false,
});

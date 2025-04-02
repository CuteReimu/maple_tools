import theme from "./theme.js";
import { defineUserConfig } from 'vuepress';
import { getDirname, path } from "vuepress/utils";
import dotenv from 'dotenv';
import * as path2 from "node:path";

const __dirname = getDirname(import.meta.url);

dotenv.config({path: path2.resolve(process.cwd(), '.env.local')});
dotenv.config();

export default defineUserConfig({
  alias: {
    "@ARC": path.resolve(__dirname, "components/ARC.vue"),
    "@HEXA": path.resolve(__dirname, "components/HEXA.vue"),
    "@SAC": path.resolve(__dirname, "components/SAC.vue"),
    "@StatEquivalentCalculator": path.resolve(__dirname, "components/StatEquivalentCalculator.vue"),
    "@StarforceCalculator": path.resolve(__dirname, "components/StarforceCalculator.vue"),
    "@PotentialSystem": path.resolve(__dirname, "components/PotentialSystem.vue"),
  },
  lang: "zh-CN",
  title: "Maplestory工具集",
  head: [
    ["link", { rel: "icon", href: '/images/maplestory.png' }],
  ],
  theme,
});

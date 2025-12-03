import theme from "./theme.js";
import { defineUserConfig } from 'vuepress';
import { path } from "vuepress/utils";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineUserConfig({
  alias: {
    "@ARC": path.resolve(__dirname, "components/ARC.vue"),
    "@HEXA": path.resolve(__dirname, "components/HEXA.vue"),
    "@SAC": path.resolve(__dirname, "components/SAC.vue"),
    "@StatEquivalentCalculator": path.resolve(__dirname, "components/StatEquivalentCalculator.vue"),
    "@StarforceCalculator": path.resolve(__dirname, "components/StarforceCalculator.vue"),
    "@StarforceTable": path.resolve(__dirname, "components/StarforceTable.vue"),
    "@PotentialSystem": path.resolve(__dirname, "components/PotentialSystem.vue"),
    "@UnicodeName": path.resolve(__dirname, "components/UnicodeName.vue"),
  },
  lang: "zh-CN",
  title: "Maplestory工具集",
  theme,
  // @ts-expect-error - bundlerConfig is supported but not in type definitions
  bundlerConfig: {
    viteOptions: {
      plugins: [
        nodePolyfills({
          include: ['buffer'],
          globals: { Buffer: true }
        })
      ]
    }
  }
});

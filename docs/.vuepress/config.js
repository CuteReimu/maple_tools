import {viteBundler} from '@vuepress/bundler-vite';
import {defaultTheme} from '@vuepress/theme-default';
import {defineUserConfig} from 'vuepress';
import {mdEnhancePlugin} from "vuepress-plugin-md-enhance";

export default defineUserConfig({
  base: '/docs/',
  dest: 'dist/docs',
  bundler: viteBundler(),
  theme: defaultTheme({
    sidebarDepth: 4,
    sidebar: [{
      text: '游戏玩法',
      collapsible: true,
      children: [
        {
          text: '术语汇编',
          collapsible: true,
          children: [
            {
              text: '状态',
              collapsible: true,
              children: ['EXP_and_Pet_Closeness', 'Formulas', 'Job_Advancements', 'Traits', 'Inner_Ability', 'Hyper_Stats', 'Maple_Union'],
            },
            {
              text: '装备强化',
              collapsible: true,
              children: ['Spell_Trace_and_Star_Force', 'Potential_System', 'Transfer_Hammer', 'Bonus_Stats', 'Soul_Weapon'],
            },
          ],
        },
        'FAQs',
      ],
    }],
  }),
  plugins: [
    mdEnhancePlugin({
      katex: true,
      hint: true,
    }),
  ],
})
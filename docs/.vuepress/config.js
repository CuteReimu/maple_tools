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
    navbar: [
      {
        text: '角色属性',
        children: ['EXP_and_Pet_Closeness', 'Formulas', 'Job_Advancements', 'Traits', 'Inner_Ability', 'Hyper_Stats', 'Maple_Union'],
      },
      {
        text: '装备强化',
        children: ['Spell_Trace_and_Star_Force', 'Potential_System', 'Transfer_Hammer', 'Bonus_Stats', 'Soul_Weapon'],
      },
      'FAQs',
    ],
  }),
  plugins: [
    mdEnhancePlugin({
      katex: true,
      hint: true,
    }),
  ],
})
import {defineClientConfig} from 'vuepress/client';
import 'element-plus/dist/index.css'
import "element-plus/theme-chalk/dark/css-vars.css";
import { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus';

export default defineClientConfig({
  enhance({ app }) {
    app.provide(ID_INJECTION_KEY, { prefix: Math.floor(Math.random() * 100000000), current: 0 });
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 });
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // 监听 html 元素的 data-theme 属性变化
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            const theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        });
      });

      observer.observe(document.documentElement, {attributes: true});
    }
  },
})
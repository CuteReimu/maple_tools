import { navbar } from "vuepress-theme-hope";
import dotenv from 'dotenv';
import * as path2 from "node:path";

dotenv.config({path: path2.resolve(process.cwd(), '.env.local')});
dotenv.config();

export default navbar([
  '/Tools/',
  '/Dictionary/',
  {
    text: "常用链接",
    icon: "link",
    children: [
      {
        text: "联盟摆放助手",
        link: process.env.VITE_LEGION_URL,
        icon: "rectangle-list",
      },
      {
        text: "NGA论坛",
        link: "https://ngabbs.com/thread.php?fid=707&rand=932",
        icon: "/images/nga.png",
      },
      {
        text: "BiliWiki",
        link: "https://wiki.biligame.com/maplestory",
        icon: "b:bilibili",
      },
      {
        text: "猫久攻略",
        link: "https://bbs.gjfmxd.com/",
        icon: "/images/maplestory.png",
      },
    ],
  },
]);

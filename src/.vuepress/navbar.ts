import { navbar } from "vuepress-theme-hope";
export default navbar([
  '/Tools/',
  '/Dictionary/',
  {
    text: "常用链接",
    icon: "link",
    children: [
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
  }
]);

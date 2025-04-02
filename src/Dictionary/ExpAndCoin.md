---
title: 经验与Mesos
icon: coins
toc: true
lastUpdated: true
editLink: true
order: 3
---

::: tip
如果找不到词条在哪，可以点击网页右上角的搜索。
:::

## 经验计算公式

$$
\begin{aligned}
& \text{乘性倍率结果} = \lfloor \text{基础经验} \times (1 + \text{乘性倍率1}\%) \times (1 + \text{乘性倍率2}\%) \times \cdots \rceil\\
& \text{额外经验1} = \lfloor \text{基础经验} \times \text{加性倍率1} \rceil\\
& \text{额外经验2} = \lfloor \text{基础经验} \times \text{加性倍率2} \rceil\\
& \vdots\\
& \text{最终经验} = \text{乘性倍率结果} + \text{额外经验1} + \text{额外经验2} + \cdots
\end{aligned}
$$

- [经验等级差距系数](#经验等级差距系数)、诅咒符文、异常状态诅咒、死亡惩罚减益、组队分配经验都直接修改**基础经验**。
- 1.5倍/2倍/3倍/联盟经验券、系统双倍、真假花、苦行戒指、来咬我吧椅子属于**乘性倍率**。
- 燃烧地图、符文、精灵吊坠、公园药、秘药、MVP气象、联盟战令格子、神之子角色卡、LINK、超级属性、其它职业技能、宠物技能经验、其它装备等属于**加性倍率**。燃烧地区计算时向下取整，其他内容为四舍五入。

::: note 举例
怪物经验为10000，人物和怪物同等级(20%)，拥有3倍经验券(200%)、假花(35%)、神之子角色卡(10%)、联盟方块(10%)、双弩LINK(20%)、公园药(10%)、超级属性(10%)，则经验计算如下：\
$\text{基础经验} = 10000 \times (1 + 20\%) = 12000$\
$\text{最终经验} = 12000 \times [(1 + 200\%) \times (1 + 35\%) + 10\% + 20\% + 10\% + 10\% + 10\%] = 55800$
:::

## 经验等级差距系数

该系数直接影响**基础经验(Basic EXP)**，即所有的经验倍率都会受此影响。部分怪物不受此影响。

::: chartjs

```js
const config = {
  type: "line",
  data: {
    datasets: [
      {
        data: [
          { x: -40, y: -90 },
          { x: -36, y: -90 },
          { x: -21, y: -30 },
          { x: -20, y: -10 },
          { x: -10, y: 0 },
          { x: -9, y: 5 },
          { x: -5, y: 5 },
          { x: -4, y: 10 },
          { x: -2, y: 10 },
          { x: -1, y: 20 },
          { x: 1, y: 20 },
          { x: 2, y: 10 },
          { x: 4, y: 10 },
          { x: 5, y: 5 },
          { x: 10, y: 0 },
          { x: 11, y: 0 },
          { x: 12, y: -1 },
          { x: 13, y: -1 },
          { x: 14, y: -2 },
          { x: 15, y: -2 },
          { x: 16, y: -3 },
          { x: 17, y: -3 },
          { x: 18, y: -4 },
          { x: 19, y: -4 },
          { x: 20, y: -5 },
          { x: 21, y: -11 },
          { x: 40, y: -30 },
          { x: 45, y: -30 }
        ]
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: (c) => "等级差距：" + c[0].label,
          label: ({raw}) => {
            if (raw.y == 0) return "经验不变";
            return raw.y >= 0 ? "经验增加" + raw.y + "%" : "经验减少" + -raw.y + "%";
          }
        }
      }
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "等级差距"
        },
        ticks: {
          stepSize: 5
        }
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "经验增加(%)"
        },
        ticks: {
          stepSize: 10
        }
      }
    }
  }
}
```

:::

## Mesos等级差距系数

据角色和怪物的等级差距，Mesos掉落数量会进行调整。这个系数**直接乘在**基础Mesos上。

::: chartjs

```js
const config = {
  type: "line",
  data: {
    datasets: [
      {
        data: [
          { x: -40, y: -100 },
          { x: -34, y: -100 },
          { x: -20, y: -30 },
          { x: -10, y: 0 },
          { x: 10, y: 0 },
          { x: 20, y: -20 },
          { x: 21, y: -25 },
          { x: 22, y: -31 },
          { x: 23, y: -38 },
          { x: 24, y: -46 },
          { x: 25, y: -55 },
          { x: 26, y: -65 },
          { x: 27, y: -76 },
          { x: 28, y: -83 },
          { x: 29, y: -97 },
          { x: 30, y: -100 },
          { x: 35, y: -100 }
        ]
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: (c) => "等级差距：" + c[0].label,
          label: ({raw}) => {
            if (raw.y == 0) return "Mesos不变";
            return raw.y >= 0 ? "Mesos增加" + raw.y + "%" : "Mesos减少" + -raw.y + "%";
          }
        }
      }
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "等级差距"
        },
        ticks: {
          stepSize: 5
        }
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Mesos增加(%)"
        },
        ticks: {
          stepSize: 10
        }
      }
    }
  }
}
```

:::

## 伤害等级差距系数

该系数在**内在能力**<em>【按照防御力的比例增加伤害固定值】</em>之前，作为<strong>最终伤害(Final Damage%)</strong>类加成应用。

::: chartjs

```js
const config = {
  type: "line",
  data: {
    datasets: [
      {
        data: [
          { x: -40, y: -100 },
          { x: -36, y: -90 },
          { x: -32, y: -80 },
          { x: -28, y: -70 },
          { x: -24, y: -60 },
          { x: -20, y: -50 },
          { x: -16, y: -40 },
          { x: -12, y: -30 },
          { x: -10, y: -25 },
          { x: -8, y: -20 },
          { x: -6, y: -15 },
          { x: -4, y: -10 },
          { x: -3, y: -5 },
          { x: -2, y: 0 },
          { x: -1, y: 5 },
          { x: 0, y: 10 },
          { x: 1, y: 12 },
          { x: 2, y: 14 },
          { x: 3, y: 16 },
          { x: 4, y: 18 },
          { x: 5, y: 20 },
          { x: 10, y: 20 }
        ]
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: (c) => { 
            if (c[0].raw.x == 0) return "等级相同";
            return c[0].raw.x > 0 ? "等级压制" + c[0].label + "级" : "等级被压制：" + -c[0].label + "级";
          },
          label: ({raw}) => {
            if (raw.y == 0) return "终伤不变";
            return raw.y >= 0 ? "终伤增加" + raw.y + "%" : "终伤减少" + -raw.y + "%";
          }
        }
      }
    },
    scales: {
      x: {
        type: "linear",
        reverse: true,
        title: {
          display: true,
          text: "等级压制"
        }
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "最终伤害增加(%)"
        },
        ticks: {
          stepSize: 10
        }
      }
    }
  }
}
```

:::

## 刷钱

首饰（戒指、耳环、项链、眼、脸）洗出五个meso词条，搓出聚财秘药，内潜洗出+20meso词条，然后猛猛刷图。\
如何洗出五钱词条：每天乌鲁斯\
+maple tour攒钱，再加上每天刷怪和每日boss的蛋钱洗。每个活动一般会送活动戒指，补齐戒指的空缺。\
如何获得聚财秘药：看群文件、搜B站。\
成型的刷钱装搭配聚财秘药目前可以做到4-5E/小时。

### 掉落来源

- 装备潜能（200%）
- 大掉（100%）
- 联盟绿（50%）
- 真假花（30%/24%）
- 聚财（20%）
- 内潜（20%/15%）
- 红毛debuff（20%）
- 标飞只给自己buff（10%）
- 琳恩buff（10%）
- 10级联盟神器（12%）

### 钱掉来源

- 装备潜能（100%）
- 联盟黄（50%）
- 聚财（20%）
- 内潜（20%/15%）
- 幻影角色卡（5%/4%）
- 刀飞自身加成（20%）

### 经验来源

- buff：
    - 双倍/三倍（100%/200%）
    - mvp（50%）
    - vip（15%）
    - 公园黄药（10%）
    - 经验秘药（10%）
- 装备：
    - 经验吊坠（30%）
    - 限时称号（10%）
- 其他：
    - 假花（35%）
    - 双弩link（20%）
    - 神子联盟卡（10%/12%）
    - 联盟方格（10%）
    - 超级属性（10%）
    - v核心（50%）
    - 龙神link（符文持续+70%）
    - 战神link（连击球+900%）

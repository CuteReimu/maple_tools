---
title: 潜能（洗魔方）
shortTitle: 洗魔方
icon: cube
order: 6
---

<PotentialSystem></PotentialSystem>

::: note 注意
以下属性在同一件装备上最多出现2条：
- Chance to ignore % damage
- Chance to become invincible

以下属性在同一件装备上最多出现1条：
- Invincibility time increase
- Decent skills of any type

!!上述表格中计算出来的平均消耗并未考虑这一点，计算结果会比实际消耗的数学期望偏大。~~但差距微小，可以忽略。~~!!
:::

::: tip 如何使用
- 例如你想要计算至少2条属性为 35% Boss Damage 以上的消耗，就选择“2条属性”，并勾选表格中所有 Boss Damage &ge; 35% 的选项。
- 例如你想要计算3条属性都为 ATT **或** Boss Damage 的概率，就选择“3条属性”，并勾选表格中所有 ATT 和 Boss Damage 。
:::

## 解封消耗

除了购买魔方的费用以外，每次重置潜能需要额外消耗**解封费用**：

$$
f(x) =
\begin{cases}
0   & \text{若 } x \le 30 \\
0.5\times x^2   & \text{若 } 30 < x \le 70 \\
2.5\times x^2   & \text{若 } 70 < x \le 120 \\
20\times x^2   & \text{若 } x > 120
\end{cases}
$$

表达式中，$f(x)$为解封 Mesos 消耗，$x$为装备等级。

::: note 注意
上述计算的消耗 Mesos 结果中均包含了**解封消耗**。
:::

<script setup>
import PotentialSystem from "@PotentialSystem";
</script>

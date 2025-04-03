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
:::

## 解封消耗

除了购买魔方的费用以外，每次重置潜能需要额外消耗**解封费用**：

$$
\begin{cases}
0   & \text{如果 } \text{装备等级} \le 30 \\
\text{装备等级}^2\times 0.5   & \text{如果 } 30 < \text{装备等级} \le 70 \\
\text{装备等级}^2\times 2.5   & \text{如果 } 70 < \text{装备等级} \le 120 \\
\text{装备等级}^2\times 20   & \text{如果 } \text{装备等级} > 120
\end{cases}
$$

<script setup>
import PotentialSystem from "@PotentialSystem";
</script>

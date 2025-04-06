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

## 升阶概率

每次重置潜能，都有几率使潜能升阶，不同魔方的升阶概率不同，能够达到的最高等价也不同。

| Cube                    | Rare -> Epic | Epic -> Unique | Unique -> Legendary |
|-------------------------|--------------|----------------|---------------------|
| Occult/Suspicious	      | 1%           | 		             |                     |
| Master Craftsman/Yellow | 	11.8%       | 	3.8%          | 	                   |
| Meister/Purple, Red     | 	14.1%	      | 6%             | 	2.4%               |
| Black                   | 16%          | 11%            | 4.7%                |

::: note Unique -> Legendary 升阶
如果忽略[解封消耗](#解封消耗)，对于 Unique -> Legendary 升阶：
- 使用 Glowing/Red 魔方（每个售价12M），总消耗的数学期望为 $12\mathrm{M} \div 2.4\% = 500\mathrm{M}$
- 使用 Bright/Black 魔方（每个售价22M），总消耗的数学期望为 $22\mathrm{M} \div 4.7\% \approx 468\mathrm{M}$

因此对于 Unique -> Legendary 升阶，购买 Bright/Black 魔方比购买 Glowing/Red 魔方更划算。
:::

::: note Rare -> Epic 升级
由于 Boss 会掉落大量的 Occult/Suspicious 魔方，因此在 Rare -> Epic 升阶中，也可以考虑使用 Occult/Suspicious 魔方：\
*（由于需要重置大量次数，[解封消耗](#解封消耗)不能忽略）*
- 对于 200 级装备，单次解封消耗为 $20\times 200^2 = 0.8\mathrm{M}$
  - 使用 Occult/Suspicious 魔方，升阶率为1%，总消耗为 $0.8\mathrm{M} \div 1\% = 80\mathrm{M}$
  - 使用 Glowing/Red 魔方（每个售价12M），总消耗为 $(12\mathrm{M}+0.8\mathrm{M}) \div 14.1\% \approx 90.8\mathrm{M}$
  - 使用 Bright/Black 魔方（每个售价22M），总消耗为 $(22\mathrm{M}+0.8\mathrm{M}) \div 16\% \approx 142.5\mathrm{M}$
- 对于 150 级装备，单次解封消耗为 $20\times 150^2 = 0.45\mathrm{M}$
  - 使用 Occult/Suspicious 魔方，升阶率为1%，总消耗为 $0.45\mathrm{M} \div 1\% = 45\mathrm{M}$
  - 在 DMT 活动中使用 Glowing/Red 魔方（每个售价12M），总消耗为 $(12\mathrm{M}+0.45\mathrm{M}) \div (2\times 14.1\%) \approx 44.1\mathrm{M}$
  - 在 DMT 活动中使用 Bright/Black 魔方（每个售价22M），总消耗为 $(22\mathrm{M}+0.45\mathrm{M}) \div (2\times 16\%) \approx 70.2\mathrm{M}$

因此，我们得出结论：对于 Rare -> Epic 升阶：
- 在无 DMT 活动时，除 250 级装备以外，都可以使用 Boss 掉落的 Occult/Suspicious 魔方
- 在有 DMT 活动时，对于 150 级及以上装备，购买 Glowing/Red 魔方比使用 Occult/Suspicious 魔方划算
:::
<script setup>
import PotentialSystem from "@PotentialSystem";
</script>

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

|                                         | Cube      | <strong style="color:#6699FF;">Rare</strong> -> <strong style="color:#B266FF;">Epic</strong> | <strong style="color:#B266FF;">Epic</strong> -> <strong style="color:#FFCC00;">Unique</strong> | <strong style="color:#FFCC00;">Unique</strong> -> <strong style="color:#00CC66;">Legendary</strong> |
|:---------------------------------------:|-----------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| ![](/images/cube/MysticalCube.png =17x) | Mystical	 | 1%                                                                                           | 		                                                                                             |                                                                                                     |
|   ![](/images/cube/HardCube.png =17x)   | Hard      | 	11.8%                                                                                       | 	3.8%                                                                                          | 	                                                                                                   |
|  ![](/images/cube/SolidCube.png =17x)   | Solid     | 	11.1%	                                                                                      | 8.3%                                                                                           | 	4.5%                                                                                               |
| ![](/images/cube/GlowingCube.png =23x)  | Glowing   | 	14.1%	                                                                                      | 6%                                                                                             | 	2.4%                                                                                               |
|  ![](/images/cube/BrightCube.png =23x)  | Bright    | 16%                                                                                          | 11%                                                                                            | 4.7%                                                                                                |

::: note <strong style="color:#FFCC00;">Unique</strong> -> <strong style="color:#00CC66;">Legendary</strong> 升阶
如果忽略[解封消耗](#解封消耗)，对于 <strong style="color:#FFCC00;">Unique</strong> -> <strong style="color:#00CC66;">Legendary</strong> 升阶：
- 使用 ![](/images/cube/GlowingCube.png =17x) Glowing 魔方（每个售价12M），总消耗的数学期望为 $12\mathrm{M} \div 2.4\% = 500\mathrm{M}$
- 使用 ![](/images/cube/BrightCube.png =17x) Bright 魔方（每个售价22M），总消耗的数学期望为 $22\mathrm{M} \div 4.7\% \approx 468\mathrm{M}$

因此对于 <strong style="color:#FFCC00;">Unique</strong> -> <strong style="color:#00CC66;">Legendary</strong> 升阶，购买 ![](/images/cube/BrightCube.png =17x) Bright 魔方比购买 ![](/images/cube/GlowingCube.png =17x) Glowing 魔方更划算。
:::

::: note <strong style="color:#6699FF;">Rare</strong> -> <strong style="color:#B266FF;">Epic</strong> 升级
由于 Boss 会掉落大量的 ![](/images/cube/MysticalCube.png =13x) Mystical 魔方，因此在 <strong style="color:#6699FF;">Rare</strong> -> <strong style="color:#B266FF;">Epic</strong> 升阶中，也可以考虑使用 ![](/images/cube/MysticalCube.png =13x) Mystical 魔方：\
*（由于需要重置大量次数，[解封消耗](#解封消耗)不能忽略）*
- 对于 200 级装备，单次解封消耗为 $20\times 200^2 = 0.8\mathrm{M}$
  - 使用 ![](/images/cube/MysticalCube.png =13x) Mystical 魔方，升阶率为1%，总消耗为 $0.8\mathrm{M} \div 1\% = 80\mathrm{M}$
  - 使用 ![](/images/cube/GlowingCube.png =17x) Glowing 魔方（每个售价12M），总消耗为 $(12\mathrm{M}+0.8\mathrm{M}) \div 14.1\% \approx 90.8\mathrm{M}$
  - 使用 ![](/images/cube/BrightCube.png =17x) Bright 魔方（每个售价22M），总消耗为 $(22\mathrm{M}+0.8\mathrm{M}) \div 16\% \approx 142.5\mathrm{M}$
- 对于 150 级装备，单次解封消耗为 $20\times 150^2 = 0.45\mathrm{M}$
  - 使用 ![](/images/cube/MysticalCube.png =13x) Mystical 魔方，升阶率为1%，总消耗为 $0.45\mathrm{M} \div 1\% = 45\mathrm{M}$
  - 在 DMT 活动中使用 ![](/images/cube/GlowingCube.png =17x) Glowing 魔方（每个售价12M），总消耗为 $(12\mathrm{M}+0.45\mathrm{M}) \div (2\times 14.1\%) \approx 44.1\mathrm{M}$
  - 在 DMT 活动中使用 ![](/images/cube/BrightCube.png =17x) Bright 魔方（每个售价22M），总消耗为 $(22\mathrm{M}+0.45\mathrm{M}) \div (2\times 16\%) \approx 70.2\mathrm{M}$

因此，我们得出结论，对于 <strong style="color:#6699FF;">Rare</strong> -> <strong style="color:#B266FF;">Epic</strong> 升阶：

对于150级以上的装备，使用 ![](/images/cube/MysticalCube.png =13x)Mystical/![](/images/cube/GlowingCube.png =17x)Glowing/![](/images/cube/BrightCube.png =17x)Bright 魔方都需要花费**44M**以上的费用，建议**优先使用** <strong style="color:#B266FF;">Epic</strong> 潜能卷或 Boss 掉落的 ![](/images/cube/HardCube.png =13x)Hard/![](/images/cube/SolidCube.png =13x)Solid 魔方。

如果一定要使用 ![](/images/cube/MysticalCube.png =13x)Mystical/![](/images/cube/GlowingCube.png =17x)Glowing/![](/images/cube/BrightCube.png =17x)Bright 魔方：
- 在无DMT活动的情况下，200级及以下装备使用 ![](/images/cube/MysticalCube.png =13x) Mystical 魔方更省钱
- 在有DMT活动的情况下，150级及以上装备使用 ![](/images/cube/GlowingCube.png =17x) Glowing 魔方更省钱
:::
<script setup>
import PotentialSystem from "@PotentialSystem";
</script>

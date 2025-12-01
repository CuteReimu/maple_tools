---
title: 星之力
icon: star
order: 7
gitInclude:
  - ../.vuepress/components/StarforceCalculator.vue
  - ../.vuepress/components/StarforceTable.vue
---

<StarforceCalculator></StarforceCalculator>

::: note 注意

以下内容全部基于GMS改版后。

:::

## 成功率

### 15星前

| 尝试        | 成功  | 失败  |
|-----------|-----|-----|
| 0★ → 1★   | 95% | 5%  |
| 1★ → 2★   | 90% | 10% |
| 2★ → 3★   | 85% | 15% |
| 3★ → 4★   | 85% | 15% |
| 4★ → 5★   | 80% | 20% |
| 5★ → 6★   | 75% | 25% |
| 6★ → 7★   | 70% | 30% |
| 7★ → 8★   | 65% | 35% |
| 8★ → 9★   | 60% | 40% |
| 9★ → 10★  | 55% | 45% |
| 10★ → 11★ | 50% | 50% |
| 11★ → 12★ | 45% | 55% |
| 12★ → 13★ | 40% | 60% |
| 13★ → 14★ | 35% | 65% |
| 14★ → 15★ | 30% | 70% |

### 15星后

- 成功率基于抓星星（+5%）的情况
- `|`右边是在损坏几率降低30%的活动下的数值

<StarforceTable></StarforceTable>

## 星级限制

| 装备等级    | 最大星星数 |
|---------|-------|
| 0~94    | 5     |
| 95~107  | 8     |
| 108~117 | 10    |
| 118~127 | 15    |
| 128~137 | 20    |
| 138及以上	 | 30    |

<script setup>
import StarforceCalculator from "@StarforceCalculator";
import StarforceTable from "@StarforceTable";
</script>

<style scoped>
</style>
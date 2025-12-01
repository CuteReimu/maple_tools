<template>
  <el-table :data="starData2" border style="max-width: 500px;">
    <el-table-column prop="cur" label="尝试" :min-width="60">
      <template #default="scope">
        {{ scope.row.cur }}★ → {{ scope.row.cur + 1 }}★
      </template>
    </el-table-column>
    <el-table-column prop="success" label="成功" :min-width="40">
      <template #default="scope">
        {{ scope.row.success }}%
      </template>
    </el-table-column>
    <el-table-column prop="fail" label="失败">
      <template #default="scope">
        {{ scope.row.fail }}
      </template>
    </el-table-column>
    <el-table-column prop="destroy" label="损坏">
      <template #default="scope">
        {{ scope.row.destroy }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {ElTableColumn, ElTable} from "element-plus";
const starData = [
  {cur: 15, success: 30, fail: 67.9, destroy: 2.1},
  {cur: 16, success: 30, fail: 67.9, destroy: 2.1},
  {cur: 17, success: 15, fail: 78.2, destroy: 6.8},
  {cur: 18, success: 15, fail: 78.2, destroy: 6.8},
  {cur: 19, success: 15, fail: 76.5, destroy: 8.5},
  {cur: 20, success: 30, fail: 59.5, destroy: 10.5},
  {cur: 21, success: 15, fail: 72.25, destroy: 12.75},
  {cur: 22, success: 15, fail: 68, destroy: 17},
  {cur: 23, success: 10, fail: 72, destroy: 18},
  {cur: 24, success: 10, fail: 72, destroy: 18},
  {cur: 25, success: 10, fail: 72, destroy: 18},
  {cur: 26, success: 7, fail: 74.4, destroy: 18.6},
  {cur: 27, success: 5, fail: 76, destroy: 19},
  {cur: 28, success: 3, fail: 77.6, destroy: 19.4},
  {cur: 29, success: 1, fail: 79.2, destroy: 19.8},
];
const starData2 = [];
const a = () => {
  for (const item of starData) {
    const success = item.success * 1.05;
    const fail1 = item.fail * (100 - success) / (100 - item.success);
    const destroy1 = item.destroy * (100 - success) / (100 - item.success);
    if (item.cur >= 22) {
      starData2.push({
        cur: item.cur,
        success: success.toFixed(2),
        fail: `${fail1.toFixed(2)}%`,
        destroy: `${destroy1.toFixed(2)}%`,
      });
      continue;
    }
    const destroy2 = destroy1 * 0.7;
    const fail2 = 100 - success - destroy2;
    starData2.push({
      cur: item.cur,
      success: success.toFixed(2),
      fail: `${fail1.toFixed(2)}% | ${fail2.toFixed(2)}%`,
      destroy: `${destroy1.toFixed(2)}% | ${destroy2.toFixed(2)}%`,
    });
  }
};
a();
</script>

<style scoped>
</style>
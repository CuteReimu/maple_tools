<template>
  <el-table :data="starData2" border style="max-width: 500px">
    <el-table-column prop="cur" label="尝试" :min-width="60">
      <template #default="scope">
        {{ scope.row.cur }}★ → {{ scope.row.cur + 1 }}★
      </template>
    </el-table-column>
    <el-table-column prop="success" label="成功" :min-width="40">
      <template #default="scope"> {{ scope.row.success }}% </template>
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
import { ElTableColumn, ElTable } from "element-plus";
const starData = [
  { cur: 15, success: 30, fail: 67.9, destroy: 2.1 },
  { cur: 16, success: 30, fail: 67.9, destroy: 2.1 },
  { cur: 17, success: 15, fail: 78.2, destroy: 6.8 },
  { cur: 18, success: 15, fail: 78.2, destroy: 6.8 },
  { cur: 19, success: 15, fail: 76.5, destroy: 8.5 },
  { cur: 20, success: 30, fail: 59.5, destroy: 10.5 },
  { cur: 21, success: 15, fail: 72.25, destroy: 12.75 },
  { cur: 22, success: 15, fail: 68, destroy: 17 },
  { cur: 23, success: 10, fail: 72, destroy: 18 },
  { cur: 24, success: 10, fail: 72, destroy: 18 },
  { cur: 25, success: 10, fail: 72, destroy: 18 },
  { cur: 26, success: 7, fail: 74.4, destroy: 18.6 },
  { cur: 27, success: 5, fail: 76, destroy: 19 },
  { cur: 28, success: 3, fail: 77.6, destroy: 19.4 },
  { cur: 29, success: 1, fail: 79.2, destroy: 19.8 },
];
const starData2 = [];
const a = () => {
  for (const item of starData) {
    const success = item.success * 1.05;
    const fail1 = (item.fail * (100 - success)) / (100 - item.success);
    const destroy1 = (item.destroy * (100 - success)) / (100 - item.success);
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
:deep(.el-table__header-wrapper .el-table__header) {
  margin: 0;
}

:deep(.el-table__body-wrapper .el-table__body) {
  margin: 0;
}

.el-table {
  border-top-color: #b8b8ba !important;
  border-left-color: #b8b8ba !important;
  border-bottom-color: #b8b8ba !important;
  border-right: none !important;
}

.el-table--border {
  border-top-color: #b8b8ba !important;
  border-left-color: #b8b8ba !important;
  border-bottom-color: #b8b8ba !important;
  border-right: none !important;
}

:deep(.el-table__inner-wrapper) {
  border-color: #b8b8ba !important;
  border-top: 1px solid #b8b8ba !important;
  border-left: 1px solid #b8b8ba !important;
  border-bottom: 1px solid #b8b8ba !important;
  border-right: none !important;
}

:deep(th),
:deep(td) {
  border-color: #b8b8ba !important;
}

.el-table--border::after,
.el-table--border::before {
  background-color: #b8b8ba !important;
}

.el-table--border::before {
  background-color: #b8b8ba !important;
  border-top: 1px solid #b8b8ba !important;
  border-left: 1px solid #b8b8ba !important;
}

.el-table--border::after {
  background-color: #b8b8ba !important;
  border-bottom: 1px solid #b8b8ba !important;
  width: 1px !important;
  right: 0 !important;
  border-right: none !important;
}

:deep(.el-table__inner-wrapper) {
  border-collapse: collapse;
}

:deep(.el-table__inner-wrapper table) {
  border-collapse: collapse;
}

.el-table--border {
  border-width: 1px;
}

:deep(th),
:deep(td) {
  border-width: 1px;
}

:deep(.el-table__body-wrapper) {
  border-top: none !important;
  border-right: none !important;
}

:deep(.el-table__body) {
  border-top: none !important;
  border-right: none !important;
}

:deep(.el-table__body tr:first-child td) {
  border-top: none !important;
}

:deep(.el-table__header-wrapper) {
  border-bottom: none !important;
  border-right: none !important;
}

:deep(.el-table__header) {
  border-bottom: none !important;
  border-right: none !important;
}

:deep(.el-table__header th) {
  border-bottom: 1px solid #b8b8ba !important;
}

:deep(.el-table__header th:last-child) {
  border-right: none !important;
}

:deep(.el-table__body td:last-child) {
  border-right: none !important;
}
</style>

<template>
  <el-row class="row">
    <el-card
      v-for="(item, index) in list"
      :key="index"
      :header="item.name"
      class="card"
    >
      <div class="input">
        <el-text class="mx-1">当前等级</el-text>
        <el-input-number
          v-model="item.level"
          :min="0"
          :max="11"
          @change="calculate(item.level, index)"
        />
      </div>
      <div class="input">
        <el-text class="mx-1">当前经验</el-text>
        <el-input-number
          v-model="item.exp"
          :min="0"
          @change="calculate(item.level, index)"
        />
      </div>
      <div>
        <el-text size="small">距满级还差 {{ item.left }} 个，需 {{ item.need }} 天</el-text>
      </div>
    </el-card>
  </el-row>
  <h2>原初球升级所需数量表</h2>
  <div>
    <el-table :data="sacCostData2" border style="width: 360px">
      <el-table-column prop="level" label="当前等级" />
      <el-table-column prop="need" label="升级所需数量" />
      <el-table-column prop="total" label="累计数量" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {reactive, onMounted, watch, computed} from "vue";
import {ElInputNumber, ElCard, ElRow, ElText, ElTableColumn, ElTable} from "element-plus";

const sacCostData = [
  0, 1, 30, 106, 247, 471, 796, 1240, 1821, 2557, 3466, 4566,
];

const sacCostData2 = computed(() => {
  return sacCostData.map((item, index) => ({
    level: index,
    need: index < sacCostData.length - 1 ? sacCostData[index + 1] - sacCostData[index] : 0,
    total: item,
  }));
});

const list = reactive([
  {
    name: "Cernium",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Hotel Arcus",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Odium",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Shangeri-la",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Arteria",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Carcion",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
]);

const calculate = (level: number, index: number) => {
  list[index].level = level;
  list[index].left =
      sacCostData[sacCostData.length - 1] - sacCostData[level] - list[index].exp;
  if (list[index].left < 0) {
    list[index].left = 0;
  }
  list[index].need = Math.ceil(list[index].left / (index == 0 ? 20 : 10));
};

watch(list, () => {
  localStorage.setItem(
    "SACData",
    JSON.stringify(
      list.map((item) => ({
        name: item.name,
        level: item.level,
        exp: item.exp,
      }))
    )
  );
});

interface StorageData {
  name: string;
  level: number;
  exp: number;
}

onMounted(() => {
  const SACData = localStorage.getItem("SACData");
  if (SACData) {
    const v = JSON.parse(SACData);
    list.forEach((item: StorageData) => {
      const i = v.find((i: StorageData) => i.name === item.name);
      item.level = i?.level || 0;
      item.exp = i?.exp || 0;
    });
  }
  list.forEach((item, index) => {
    calculate(item.level, index);
  });
});
</script>

<style scoped>
:deep(.el-table__header-wrapper .el-table__header) {
  margin: 0;
}

:deep(.el-table__body-wrapper .el-table__body) {
  margin: 0;
}

:deep(th) {
  border: none;
}

:deep(td) {
  border: none;
}

.row {
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
}

.input {
  margin-bottom: 5px;
}

.card {
  margin: 10px;
}

.mx-1 {
  margin-right: 10px;
}
</style>
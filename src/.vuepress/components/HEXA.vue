<template>
  <div class="row">
    <el-card
      v-for="(item, index) in list"
      :key="index"
      :header="item.name"
      class="card"
    >
      <div class="input">
        <el-text class="mx-1">当前等级：</el-text>
        <el-input-number
          v-model="item.level"
          :min="item.min"
          :max="item.max"
          @change="calculate(item.data, item.level, item.target, index)"
        />
      </div>
      <div class="input">
        <el-text class="mx-1">目标等级：</el-text>
        <el-input-number
          v-model="item.target"
          :min="item.min"
          :max="item.max"
          @change="calculate(item.data, item.level, item.target, index)"
        />
      </div>
      <div>
        <el-text size="small">已消耗碎片数量：{{ item.cost }}</el-text>
      </div>
      <div>
        <el-text size="small">距离目标还需要：{{ item.left }}</el-text>
      </div>
    </el-card>
  </div>
  <div>
    <div>
      <el-progress
        :percentage="percentage"
        :format="format"
        style="width: 100%; max-width: 400px"
      />
    </div>
    <div>
      <el-text class="mx-1">已消耗碎片总量：{{ totalCost }}</el-text>
    </div>
    <div>
      <el-text class="mx-1">还需要碎片总量：{{ totalLeft }}</el-text>
    </div>
  </div>
  <h2>六转小核所需数量表</h2>
  <div>
    <el-table :data="costData2" border>
      <el-table-column fixed prop="level" label="当前等级" />
      <el-table-column label="技能核心">
        <el-table-column prop="skillNeed" label="升级所需数量" />
        <el-table-column prop="skillTotal" label="累计数量" />
      </el-table-column>
      <el-table-column label="精通核心">
        <el-table-column prop="jingtongNeed" label="升级所需数量" />
        <el-table-column prop="jingtongTotal" label="累计数量" />
      </el-table-column>
      <el-table-column label="强化核心">
        <el-table-column prop="strongNeed" label="升级所需数量" />
        <el-table-column prop="strongTotal" label="累计数量" />
      </el-table-column>
      <el-table-column label="通用核心">
        <el-table-column prop="commonNeed" label="升级所需数量" />
        <el-table-column prop="commonTotal" label="累计数量" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed, onMounted, watch} from "vue";
import {
  ElCard,
  ElText,
  ElInputNumber,
  ElProgress, ElTable, ElTableColumn,
} from "element-plus";

const skillCostData = [
  0, 30, 35, 40, 45, 50, 55, 60, 65, 200, 80, 90, 100, 110, 120, 130, 140, 150,
  160, 350, 170, 180, 190, 200, 210, 220, 230, 240, 250, 500, 0
];
const jingtongCostData = [
  50, 15, 18, 20, 23, 25, 28, 30, 33, 100, 40, 45, 50, 55, 60, 65, 70, 75, 80,
  175, 85, 90, 95, 100, 105, 110, 115, 120, 125, 250, 0
];
const strongCostData = [
  75, 23, 27, 30, 34, 38, 42, 45, 49, 150, 60, 68, 75, 83, 90, 98, 105, 113,
  120, 263, 128, 135, 143, 150, 158, 165, 173, 180, 188, 375, 0
];
const commonCostData = [
  125, 38, 44, 50, 57, 63, 69, 75, 82, 300, 110, 124, 138, 152, 165, 179, 193,
  207, 220, 525, 234, 248, 262, 275, 289, 303, 317, 330, 344, 750, 0
];

const costData2 = computed(() => {
  let skillTotal = 0;
  let jingtongTotal = 0;
  let strongTotal = 0;
  let commonTotal = 0;
  return skillCostData.map((_, index) => {
    let ret = {
      level: index,
      skillNeed: skillCostData[index],
      skillTotal: skillTotal,
      jingtongNeed: jingtongCostData[index],
      jingtongTotal: jingtongTotal,
      strongNeed: strongCostData[index],
      strongTotal: strongTotal,
      commonNeed: commonCostData[index],
      commonTotal: commonTotal,
    };
    skillTotal += skillCostData[index];
    jingtongTotal += jingtongCostData[index];
    strongTotal += strongCostData[index];
    commonTotal += commonCostData[index];
    return ret;
  });
});

const list = reactive([
  {
    name: "技能1核心",
    data: skillCostData,
    level: 1,
    target: 1,
    cost: 0,
    left: 0,
    min: 1,
    max: 30,
  },
  {
    name: "技能2核心",
    data: skillCostData,
    level: 0,
    target: 0,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "精通1核心",
    data: jingtongCostData,
    level: 0,
    target: 29,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "精通2核心",
    data: jingtongCostData,
    level: 0,
    target: 19,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "精通3核心",
    data: jingtongCostData,
    level: 0,
    target: 9,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "精通4核心",
    data: jingtongCostData,
    level: 0,
    target: 9,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "强化1核心",
    data: strongCostData,
    level: 0,
    target: 1,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "强化2核心",
    data: strongCostData,
    level: 0,
    target: 1,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "强化3核心",
    data: strongCostData,
    level: 0,
    target: 1,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "强化4核心",
    data: strongCostData,
    level: 0,
    target: 1,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "双面神",
    data: commonCostData,
    level: 0,
    target: 0,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
]);

const totalCost = computed(() => {
  let v = 0;
  list.forEach((item) => {
    v += item.cost;
  });
  return v;
});
const totalLeft = computed(() => {
  let v = 0;
  list.forEach((item) => {
    v += item.left;
  });
  return v;
});
const percentage = computed(
  () => (totalCost.value / (totalCost.value + totalLeft.value)) * 100 || 0
);

const calculate = (
  data: number[],
  level: number,
  target: number,
  index: number
) => {
  let cost = 0;
  let left = 0;
  for (let i = 0; i < level; i++) {
    cost += data[i];
  }
  for (let i = level; i < target; i++) {
    left += data[i];
  }
  list[index].cost = cost;
  list[index].left = left;
};

const format = (percentage: number) => percentage.toFixed(2) + "%";

watch(list, () => {
  localStorage.setItem(
    "HEXAData",
    JSON.stringify(
      list.map((item) => ({
        name: item.name,
        level: item.level,
        target: item.target,
      }))
    )
  );
});

interface StorageData {
  name: string;
  level: number;
  target: number;
  min: number;
}

onMounted(() => {
  const HEXAData = localStorage.getItem("HEXAData");
  if (HEXAData) {
    const data = JSON.parse(HEXAData);
    list.forEach((item: StorageData) => {
      const i = data?.find((i: StorageData) => i.name === item.name);
      item.level = i?.level || item.min;
      item.target = i?.target || item.min;
    });
  }
  list.forEach((item, index) => {
    calculate(item.data, item.level, item.target, index);
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
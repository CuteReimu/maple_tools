<template>
  <el-row align="middle" class="row" v-for="(item, index) in list" :key="index">
    <el-col>
      <div>
        <el-text class="mx-1">{{ item.name }}</el-text>
        <el-input-number
          v-model="item.level"
          :min="item.min"
          :max="item.max"
          @change="calculate(item.data, item.level, item.target, index)"
        />
        <el-text class="mx-1">&nbsp;&nbsp;&nbsp;&nbsp;目标等级：</el-text>
        <el-input-number
            v-model="item.target"
            :min="item.min"
            :max="item.max"
            @change="calculate(item.data, item.level, item.target, index)"
        />
      </div>
      <div>
        <el-text size="small">已消耗碎片数量：</el-text>
        <el-text size="small">{{ item.cost }}</el-text>
        <el-text size="small">&nbsp;&nbsp;&nbsp;&nbsp;距离目标还需要：</el-text>
        <el-text size="small">{{ item.left }}</el-text>
      </div>
    </el-col>
  </el-row>
  <el-row align="middle" class="row">
    <el-col>
      <div>
        <el-progress
          :percentage="percentage"
          :format="format"
          style="width: 480px"
        />
      </div>
      <div>
        <el-text class="mx-1">已消耗碎片总量</el-text>
        <el-text>{{ totalCost }}</el-text>
      </div>
      <div>
        <el-text class="mx-1">还需要碎片总量</el-text>
        <el-text>{{ totalLeft }}</el-text>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {reactive, computed, onMounted} from "vue";
import { ElRow, ElCol, ElText, ElInputNumber, ElProgress } from "element-plus";

const skillCostData = [
  0, 30, 35, 40, 45, 50, 55, 60, 65, 200, 80, 90, 100, 110, 120, 130, 140, 150,
  160, 350, 170, 180, 190, 200, 210, 220, 230, 240, 250, 500,
];
const jingtongCostData = [
  50, 15, 18, 20, 23, 25, 28, 30, 33, 100, 40, 45, 50, 55, 60, 65, 70, 75, 80,
  175, 85, 90, 95, 100, 105, 110, 115, 120, 125, 250,
];
const strongCostData = [
  75, 23, 27, 30, 34, 38, 42, 45, 49, 150, 60, 68, 75, 83, 90, 98, 105, 113,
  120, 263, 128, 135, 143, 150, 158, 165, 173, 180, 188, 375,
];

const list = reactive([
  {
    name: "技能核心",
    data: skillCostData,
    level: 1,
    target: 1,
    cost: 0,
    left: 0,
    min: 1,
    max: 30,
  },
  {
    name: "精通1核心",
    data: jingtongCostData,
    level: 0,
    target: 19,
    cost: 0,
    left: 0,
    min: 0,
    max: 30,
  },
  {
    name: "精通2核心",
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

const calculate = (data: number[], level: number, target: number, index: number, save: boolean = true) => {
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
  if (save) {
    localStorage.setItem("HEXAData", JSON.stringify(list));
  }
};

const format = (percentage: number) => percentage.toFixed(2) + "%";

onMounted(() => {
  const data = localStorage.getItem("HEXAData");
  if (data) {
    const items = JSON.parse(data);
    list.forEach((item) => {
      const i = items.find((i: any) => i.name === item.name);
      item.level = i.level;
      item.target = i.target;
    });
  }
  list.forEach((item, index) => {
    calculate(item.data, item.level, item.target, index, false);
  });
});
</script>

<style scoped>
.row {
  margin: 10px 0;
}

.mx-1 {
  margin-right: 10px;
}
</style>

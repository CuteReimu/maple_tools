<template>
  <el-row>
    <el-text class="mx-1">技能核心</el-text>
    <el-input-number v-model="skill" :min="1" :max="30" @change="calculate"/>
  </el-row>
  <el-row>
    <el-text class="mx-1">已消耗碎片数量：</el-text>
    <el-text>{{ skillCost }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">距离满级还需要：</el-text>
    <el-text>{{ skillLeft }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">精通1核心</el-text>
    <el-input-number v-model="jingtong1" :min="0" :max="30" @change="calculate"/>
  </el-row>
  <el-row>
    <el-text class="mx-1">已消耗碎片数量：</el-text>
    <el-text>{{ jingtong1Cost }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">距离满级还需要：</el-text>
    <el-text>{{ jingtong1Left }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">精通2核心</el-text>
    <el-input-number v-model="jingtong2" :min="0" :max="30" @change="calculate"/>
  </el-row>
  <el-row>
    <el-text class="mx-1">已消耗碎片数量：</el-text>
    <el-text>{{ jingtong2Cost }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">距离满级还需要：</el-text>
    <el-text>{{ jingtong2Left }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">强化1核心</el-text>
    <el-input-number v-model="strong1" :min="0" :max="30" @change="calculate"/>
  </el-row>
  <el-row>
    <el-text class="mx-1">已消耗碎片数量：</el-text>
    <el-text>{{ strong1Cost }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">距离满级还需要：</el-text>
    <el-text>{{ strong1Left }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">强化2核心</el-text>
    <el-input-number v-model="strong2" :min="0" :max="30" @change="calculate"/>
  </el-row>
  <el-row>
    <el-text class="mx-1">已消耗碎片数量：</el-text>
    <el-text>{{ strong2Cost }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">距离满级还需要：</el-text>
    <el-text>{{ strong2Left }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">强化3核心</el-text>
    <el-input-number v-model="strong3" :min="0" :max="30" @change="calculate"/>
  </el-row>
  <el-row>
    <el-text class="mx-1">已消耗碎片数量：</el-text>
    <el-text>{{ strong3Cost }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">距离满级还需要：</el-text>
    <el-text>{{ strong3Left }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">强化4核心</el-text>
    <el-input-number v-model="strong4" :min="0" :max="30" @change="calculate"/>
  </el-row>
  <el-row>
    <el-text class="mx-1">已消耗碎片数量：</el-text>
    <el-text>{{ strong4Cost }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">距离满级还需要：</el-text>
    <el-text>{{ strong4Left }}</el-text>
  </el-row>
  <el-row>
    <el-progress :percentage="percentage" style="width: 239px"/>
  </el-row>
  <el-row>
    <el-text class="mx-1">已消耗碎片总量</el-text>
    <el-text>{{ totalCost }}</el-text>
  </el-row>
  <el-row>
    <el-text class="mx-1">还需要碎片总量</el-text>
    <el-text>{{ totalLeft }}</el-text>
  </el-row>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {ElRow, ElInputNumber, ElProgress} from 'element-plus'

const skillCostData = [0, 30, 35, 40, 45, 50, 55, 60, 65, 200, 80, 90, 100, 110, 120, 130, 140, 150, 160, 350, 170, 180, 190, 200, 210, 220, 230, 240, 250, 500]
const jingtongCostData = [50, 15, 18, 20, 23, 25, 28, 30, 33, 100, 40, 45, 50, 55, 60, 65, 70, 75, 80, 175, 85, 90, 95, 100, 105, 110, 115, 120, 125, 250]
const strongCostData = [75, 23, 27, 30, 34, 38, 42, 45, 49, 150, 60, 68, 75, 83, 90, 98, 105, 113, 120, 263, 128, 135, 143, 150, 158, 165, 173, 180, 188, 375]

const skill = ref(1);
const skillCost = ref(0);
const skillLeft = ref(0);
const jingtong1 = ref(0);
const jingtong1Cost = ref(0);
const jingtong1Left = ref(0);
const jingtong2 = ref(0);
const jingtong2Cost = ref(0);
const jingtong2Left = ref(0);
const strong1 = ref(0);
const strong1Cost = ref(0);
const strong1Left = ref(0);
const strong2 = ref(0);
const strong2Cost = ref(0);
const strong2Left = ref(0);
const strong3 = ref(0);
const strong3Cost = ref(0);
const strong3Left = ref(0);
const strong4 = ref(0);
const strong4Cost = ref(0);
const strong4Left = ref(0);
const percentage = ref(0);
const totalCost = ref(0);
const totalLeft = ref(0);

function calculateOne(data: number[], level: number): [number, number] {
  let cost = 0;
  let left = 0;
  for (let i = 0; i < level; i++) {
    cost += data[i];
  }
  for (let i = level; i < data.length; i++) {
    left += data[i];
  }
  return [cost, left];
}

function calculate() {
  [skillCost.value, skillLeft.value] = calculateOne(skillCostData, skill.value);
  [jingtong1Cost.value, jingtong1Left.value] = calculateOne(jingtongCostData, jingtong1.value);
  [jingtong2Cost.value, jingtong2Left.value] = calculateOne(jingtongCostData, jingtong2.value);
  [strong1Cost.value, strong1Left.value] = calculateOne(strongCostData, strong1.value);
  [strong2Cost.value, strong2Left.value] = calculateOne(strongCostData, strong2.value);
  [strong3Cost.value, strong3Left.value] = calculateOne(strongCostData, strong3.value);
  [strong4Cost.value, strong4Left.value] = calculateOne(strongCostData, strong4.value);
  totalCost.value = skillCost.value + jingtong1Cost.value + jingtong2Cost.value + strong1Cost.value + strong2Cost.value + strong3Cost.value + strong4Cost.value;
  totalLeft.value = skillLeft.value + jingtong1Left.value + jingtong2Left.value + strong1Left.value + strong2Left.value + strong3Left.value + strong4Left.value;
  percentage.value = Number((totalCost.value / (totalCost.value + totalLeft.value) * 100).toFixed(2));
}

onMounted(() => {
  calculate();
});

</script>

<template>
  <el-row align="middle" class="row" v-for="(item, index) in data.list" :key="index">
    <el-col>
      <div>
        <el-text class="mx-1">{{ item.name }}</el-text>
        <el-input-number
            v-model="item.level"
            :min="0"
            :max="20"
            @change="calculate(item.level, index)"
        />
        <el-text class="mx-1">&nbsp;&nbsp;&nbsp;&nbsp;当前经验</el-text>
        <el-input-number
            v-model="item.exp"
            :min="0"
            :max="levelMaxExp(item.level)"
            @change="calculate(item.level, index)"
        />
      </div>
      <div>
        <el-text size="small">距离满级还需要：</el-text>
        <el-text size="small">{{ item.left }}</el-text>
        <el-text size="small">&nbsp;&nbsp;&nbsp;&nbsp;还需天数：</el-text>
        <el-text size="small">{{ item.need }}</el-text>
      </div>
    </el-col>
  </el-row>
  <el-row align="middle" class="row">
    <el-col>
      <div>
        <el-text class="mx-1">每日岛球数量</el-text>
        <el-input-number v-model="data.daily" :min="0" @change="calculateAll(true)"/>
        <el-text class="mx-1">&nbsp;&nbsp;&nbsp;&nbsp;每周岛球数量</el-text>
        <el-input-number v-model="data.weekly" :min="0" @change="calculateAll(true)"/>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {reactive, onMounted} from "vue";
import {ElCol, ElInputNumber, ElRow, ElText} from "element-plus";

const arcCostData = [
  0, 1, 13, 28, 48, 75, 111, 158, 218, 293, 385,
  496, 628, 783, 963, 1170, 1406, 1673, 1973, 2308, 2680
];

const levelMaxExp = (level: number) => {
  if (level <= 0 || level >= 20) {
    return 0;
  }
  return arcCostData[level + 1] - arcCostData[level] - 1;
}

const data = reactive({
  daily: 20,
  weekly: 45,
  list: [
    {
      name: "1岛",
      level: 0,
      exp: 0,
      left: 0,
      need: 0,
    },
    {
      name: "2岛",
      level: 0,
      exp: 0,
      left: 0,
      need: 0,
    },
    {
      name: "3岛",
      level: 0,
      exp: 0,
      left: 0,
      need: 0,
    },
    {
      name: "4岛",
      level: 0,
      exp: 0,
      left: 0,
      need: 0,
    },
    {
      name: "5岛",
      level: 0,
      exp: 0,
      left: 0,
      need: 0,
    },
    {
      name: "6岛",
      level: 0,
      exp: 0,
      left: 0,
      need: 0,
    },
  ]
})

const calculate = (level: number, index: number, save: boolean = true) => {
  const levelMax = levelMaxExp(level);
  data.list[index].exp = Math.min(data.list[index].exp, levelMax);
  data.list[index].level = level
  data.list[index].left = arcCostData[arcCostData.length - 1] - arcCostData[level] - data.list[index].exp;
  data.list[index].need = Math.ceil(data.list[index].left / (data.daily + data.weekly / 7));
  if (save) {
    localStorage.setItem("ARCData", JSON.stringify(data));
  }
};

const calculateAll = (save: boolean = true) => {
  data.list.forEach((item, index) => {
    calculate(item.level, index, save);
  });
}

onMounted(() => {
  const d = localStorage.getItem("ARCData");
  if (d) {
    const v = JSON.parse(d);
    data.list.forEach((item: any) => {
      const i = v.list.find((i: any) => i.name === item.name);
      item.level = i.level;
    });
    data.daily = v.daily;
    data.weekly = v.weekly;
  }
  calculateAll(false)
});
</script>

<style scoped>

</style>
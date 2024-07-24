<template>
  <el-row align="middle" class="row" v-for="(item, index) in data.list" :key="index">
    <el-col>
      <div>
        <el-text class="mx-1">{{ item.name }}</el-text>
        <el-input-number
            v-model="item.level"
            :min="0"
            :max="11"
            @change="calculate(item.level, index)"
        />
        <el-text class="mx-1">&nbsp;&nbsp;&nbsp;&nbsp;当前经验</el-text>
        <el-input-number
            v-model="item.exp"
            :min="0"
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
</template>

<script setup lang="ts">
import {reactive, onMounted} from "vue";
import {ElCol, ElInputNumber, ElRow, ElText} from "element-plus";

const arcCostData = [0, 1, 30, 106, 247, 471, 796, 1240, 1821, 2557, 3466, 4566];

const data = reactive({
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
  data.list[index].level = level
  data.list[index].left = arcCostData[arcCostData.length - 1] - arcCostData[level] - data.list[index].exp;
  if (data.list[index].left < 0) {
    data.list[index].left = 0
  }
  data.list[index].need = Math.ceil(data.list[index].left / (index == 0 ? 20 : 10));
  if (save) {
    localStorage.setItem("SACData", JSON.stringify(data));
  }
};

const calculateAll = (save: boolean = true) => {
  data.list.forEach((item, index) => {
    calculate(item.level, index, save);
  });
}

onMounted(() => {
  const d = localStorage.getItem("SACData");
  if (d) {
    const v = JSON.parse(d);
    data.list.forEach((item: any) => {
      const i = v.list.find((i: any) => i.name === item.name);
      item.level = i.level;
      item.exp = i.exp;
    });
  }
  calculateAll(false)
});
</script>

<style scoped>

</style>
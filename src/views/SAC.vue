<template>
  <el-row class="row">
    <el-card v-for="(item, index) in list" :key="index" :header="item.name">
      <div>
        <el-text class="mx-1">当前等级</el-text>
        <el-input-number
            v-model="item.level"
            :min="0"
            :max="11"
            @change="calculate(item.level, index)"
        />
      </div>
      <div>
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
</template>

<script setup lang="ts">
import {reactive, onMounted, watch} from "vue";
import {ElInputNumber, ElCard, ElRow, ElText} from "element-plus";

const arcCostData = [0, 1, 30, 106, 247, 471, 796, 1240, 1821, 2557, 3466, 4566];

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
  list[index].level = level
  list[index].left = arcCostData[arcCostData.length - 1] - arcCostData[level] - list[index].exp;
  if (list[index].left < 0) {
    list[index].left = 0
  }
  list[index].need = Math.ceil(list[index].left / (index == 0 ? 20 : 10));
};

watch(list, () => {
  localStorage.setItem(
      "SACData",
      JSON.stringify(list.map((item) => ({name: item.name, level: item.level, exp: item.exp})))
  );
});

onMounted(() => {
  const SACData = localStorage.getItem("SACData");
  if (SACData) {
    const v = JSON.parse(SACData);
    list.forEach((item: any) => {
      const i = v.find((i: any) => i.name === item.name);
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
.row {
  margin: 10px 0;
}

.row > div {
  margin-bottom: 5px;
}

.mx-1 {
  margin-right: 10px;
}
</style>
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
            :max="20"
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
        <el-text size="small"
        >距满级还差 {{ item.left }} 个，需 {{ item.need }} 天</el-text
        >
      </div>
    </el-card>
  </el-row>
  <div>
    <div class="input">
      <el-text class="mx-1">每日岛球数量</el-text>
      <el-input-number v-model="daily" :min="0" @change="calculateAll()" />
    </div>
    <div class="input">
      <el-text class="mx-1">每周岛球数量</el-text>
      <el-input-number v-model="weekly" :min="0" @change="calculateAll()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, ref } from "vue";
import { ElInputNumber, ElRow, ElCard, ElText } from "element-plus";

const arcCostData = [
  0, 1, 13, 28, 48, 75, 111, 158, 218, 293, 385, 496, 628, 783, 963, 1170, 1406,
  1673, 1973, 2308, 2680,
];

const daily = ref(20);
const weekly = ref(45);

const list = reactive([
  {
    name: "Vanishing Journey",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Chu Chu Island",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Lachelein",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Arcana",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Morass",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
  {
    name: "Esfera",
    level: 0,
    exp: 0,
    left: 0,
    need: 0,
  },
]);

const calculate = (level: number, index: number) => {
  list[index].level = level;
  list[index].left =
      arcCostData[arcCostData.length - 1] - arcCostData[level] - list[index].exp;
  if (list[index].left < 0) {
    list[index].left = 0;
  }
  list[index].need = Math.ceil(
      list[index].left / (daily.value + weekly.value / 7)
  );
};

const calculateAll = () => {
  list.forEach((item, index) => {
    calculate(item.level, index);
  });
};

const save = () => {
  const items = list.map((item) => ({
    name: item.name,
    level: item.level,
    exp: item.exp,
  }));
  localStorage.setItem(
      "ARCData",
      JSON.stringify({ list: items, daily: daily.value, weekly: weekly.value })
  );
};

watch(list, save);
watch(daily, save);
watch(weekly, save);

interface StorageData {
  name: string;
  level: number;
  exp: number;
}

onMounted(() => {
  const d = localStorage.getItem("ARCData");
  if (d) {
    const v = JSON.parse(d);
    list.forEach((item: StorageData) => {
      const i = v.list?.find((i: StorageData) => i.name === item.name);
      item.level = i?.level || 0;
      item.exp = i?.exp || 0;
    });
    daily.value = v.daily;
    weekly.value = v.weekly;
  }
  calculateAll();
});
</script>

<style scoped>
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
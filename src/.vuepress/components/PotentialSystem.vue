<template>
  <el-form :model="form" label-width="auto">
    <el-form-item label="魔方类型">
      <el-radio-group v-model="form.type" fill="#f59139" :disabled="try_count > 0">
        <el-radio-button value="red" name="type">
          Glowing/Red
        </el-radio-button>
        <el-radio-button value="black" name="type">
          Bright/Black
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="部位">
      <ClientOnly>
        <el-select
          v-model="form.position"
          style="width: 240px"
          :disabled="try_count > 0"
        >
          <el-option
            v-for="item in position"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </ClientOnly>
    </el-form-item>
    <el-form-item>
      <el-button
        size="large"
        type="warning"
        @click="doStuff"
      >
        点！
      </el-button>
      <el-button
        size="large"
        type="danger"
        @click="doReset"
      >
        重置
      </el-button>
    </el-form-item>
  </el-form>
  <p>
    <el-text size="large">
      第 {{ try_count }} 次尝试，共花费 {{ cost }}B Mesos
    </el-text>
  </p>
  <div v-for="(item, index) in try_result" :key="index">
    <el-text size="large">
      {{ item }}
    </el-text>
  </div>
  <h2>属性概率表(%)</h2>
  <el-table :data="tableData" border>
    <el-table-column
      prop="type"
      class-name="overflow-hidden"
      show-overflow-tooltip
      label="属性"
      width="230"
    />
    <el-table-column prop="first_line" label="第一条" width="90" />
    <el-table-column prop="second_line" label="第二条" width="90" />
    <el-table-column prop="third_line" label="第三条" width="90" />
  </el-table>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {
  ElText, ElSelect, ElOption, ElRadioGroup, ElRadioButton,
  ElForm, ElFormItem, ElButton, ElTable, ElTableColumn,
} from "element-plus";
import { cubeRates } from "./cubeRates.js";

const importantAttr = ["STR", "DEX", "INT", "LUK", "All Stats", "Critical Damage", "Item Drop Rate", "Meso Amount"];
const tableData = computed(() => {
  const result = [];
  const rate = cubeRates.lvl120to200[form.position][form.type].legendary;
  const rates = [rate.first_line, rate.second_line, rate.third_line];
  for (let i = 0; i < rates.length; i++) {
    for (const line of rates[i]) {
      let lineType = line[0] as string;
      const lineValue = line[1] as number | string | string[];
      const lineRate = line[2] as number;
      if (lineType === "Junk") {
        lineType = "其它垃圾属性";
      } else if (lineType.includes("Flat")) {
        lineType = lineType.replace("Flat", `+${lineValue}`);
      } else if (lineType.includes("%")) {
        lineType = lineType.replace("%", lineValue + "%");
      } else if (lineType === "Boss Damage") {
        lineType = `${lineType} ${lineValue}%`;
      } else {
        lineType = `${lineType}: ${lineValue}%`;
      }
      let v = result.find((value) => value.type === lineType);
      if (!v) {
        v = {type: lineType, first_line: 0, second_line: 0, third_line: 0};
        result.push(v);
      }
      if (i === 0) v.first_line = lineRate;
      else if (i === 1) v.second_line = lineRate;
      else v.third_line = lineRate;
    }
  }
  return result.sort((a, b) => {
    if (a.type === "其它垃圾属性" && b.type !== "其它垃圾属性") return 1;
    if (a.type !== "其它垃圾属性" && b.type === "其它垃圾属性") return -1;
    if (["weapon", "secondary", "emblem"].includes(form.position)) {
      const isImportant = (t: string) =>
        t.includes("ATT") && t.includes("%") || t.includes("Boss Damage") || t.includes("Ignore Enemy Defense");
      const iA = isImportant(a.type);
      const iB = isImportant(b.type);
      if (iA != iB) return iA ? -1 : 1;
    } else {
      const isImportant = (t: string) =>
        importantAttr.some((s) => t.includes(s)) && t.includes("%") || t.includes("Skill Cooldown Reduction");
      const iA = isImportant(a.type);
      const iB = isImportant(b.type);
      if (iA != iB) return iA ? -1 : 1;
      else if (iA && iB) {
        if (a.type.length >= 15 && b.type.length < 15) return -1;
        if (a.type.length < 15 && b.type.length >= 15) return 1;
      }
    }
    return a.type.length - b.type.length;
  });
});

const form = reactive({
  type: "red",
  trials: 0,
  position: "weapon",
});

const position = [
  { value: "weapon", label: "武器"},
  { value: "secondary", label: "副武器"},
  { value: "emblem", label: "纹章"},
  { value: "hat", label: "帽子" },
  { value: "overall", label: "套服" },
  { value: "top", label: "上衣" },
  { value: "bottom", label: "裙/裤" },
  { value: "shoulder", label: "护肩" },
  { value: "gloves", label: "手套" },
  { value: "shoes", label: "鞋子" },
  { value: "cape", label: "披风" },
  { value: "ring", label: "首饰" },
  { value: "belt", label: "腰带" },
  { value: "heart", label: "心脏" },
];

const cost = computed(() => {
  const result = (form.type == "red" ? 12 : 22) * try_count.value;
  return result < 100 ? (result/1000).toFixed(3) : (result/1000).toPrecision(3);
});

const try_count = ref(0);
const try_result = ref([]);

const doStuff = () => {
  try_count.value += 1;
  const rate = cubeRates.lvl120to200[form.position][form.type].legendary;
  const rates = [rate.first_line, rate.second_line, rate.third_line];
  const a = [];
  for (let i = 0; i < rates.length; i++) {
    let r = Math.random() * 100;
    for (const line of rates[i]) {
      const lineType = line[0] as string;
      const lineValue = line[1] as number | string | string[];
      const lineRate = line[2] as number;
      if (r < lineRate) {
        if (lineType === "Junk") {
          const l = lineValue as string[];
          a.push(l[Math.floor(Math.random() * l.length)]);
        } else if (lineType.includes("Flat")) {
          a.push(lineType.replace("Flat", `+${lineValue}`));
        } else if (lineType.includes("%")) {
          a.push(lineType.replace("%", lineValue + "%"));
        } else if (lineType === "Boss Damage") {
          a.push(`${lineType} ${lineValue}%`);
        } else {
          a.push(`${lineType}: ${lineValue}%`);
        }
        break;
      }
      r -= lineRate;
    }
  }
  try_result.value = a;
};

const doReset = () => {
  try_result.value = [];
  try_count.value = 0;
};
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
</style>
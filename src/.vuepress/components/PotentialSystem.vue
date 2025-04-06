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
        <el-cascader
          v-model="form.position"
          style="width: 240px"
          :show-all-levels="false"
          popper-class="popper_custom_height_8"
          :options="position"
          :props="{ expandTrigger: 'hover' }"
          :disabled="try_count > 0"
        />
      </ClientOnly>
    </el-form-item>
    <el-form-item label="等级">
      <el-input-number
        v-model="form.itemLevel"
        :min="70"
        :max="250"
        :step="10"
        :disabled="try_count > 0"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        size="large"
        type="warning"
        @click="doStuff0"
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
      {{ item.text }}
    </el-text>
  </div>
  <h2>属性概率表(%)</h2>
  <div>
    <el-radio-group v-model="lineCount" fill="#f59139" size="small">
      <el-radio-button :value="1" name="lineCount">
        至少1条
      </el-radio-button>
      <el-radio-button :value="2" name="lineCount">
        至少2条
      </el-radio-button>
      <el-radio-button :value="3" name="lineCount">
        至少3条
      </el-radio-button>
    </el-radio-group>
  </div>
  <p>
    <el-text size="large">
      {{ selectionRates }}
    </el-text>
  </p>
  <el-table
    :data="tableData"
    border
    row-key="text"
    @selection-change="(v: RateLine[]) => { multipleSelection = v }"
  >
    <el-table-column type="selection" :selectable="selectable" width="39" />
    <el-table-column
      prop="text"
      class-name="overflow-hidden"
      show-overflow-tooltip
      label="属性"
      width="230"
    />
    <el-table-column label="第一条" width="90">
      <template #default="scope">
        <el-text>
          {{ scope.row.first_line === 0 ? "0" : scope.row.first_line.toFixed(4) }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column label="第二条" width="90">
      <template #default="scope">
        <el-text>
          {{ scope.row.second_line === 0 ? "0" : scope.row.second_line.toFixed(4) }}
        </el-text>
      </template>
    </el-table-column>
    <el-table-column label="第三条" width="90">
      <template #default="scope">
        <el-text>
          {{ scope.row.third_line === 0 ? "0" : scope.row.third_line.toFixed(4) }}
        </el-text>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInputNumber,
  ElMessageBox,
  ElCascader,
  ElRadioButton,
  ElRadioGroup,
  ElTable,
  ElTableColumn,
  ElText,
} from "element-plus";
import {cubeRates, CubeType, EquipmentPosition, RatesLineData} from "./cubeRates.js";

interface RateLine {
  id: number
  text: string
  type: string
  value: number
  first_line: number
  second_line: number
  third_line: number
}

const multipleSelection = ref<RateLine[]>([]);
const getCubeCost = (cubeType: CubeType) => {
  switch (cubeType) {
  case "red":
    return 12000000;
  case "black":
    return 22000000;
  case "master":
    return 7500000;
  default:
    return 0;
  }
};
const getRevealCostConstant = (itemLevel: number) => {
  if (itemLevel < 30) { return 0; }
  if (itemLevel <= 70) { return 0.5; }
  if (itemLevel <= 120) { return 2.5; }
  return 20;
};
const cubingCost = (cubeType: CubeType, itemLevel: number, totalCubeCount: number) => {
  const cubeCost = getCubeCost(cubeType);
  const revealCostConst = getRevealCostConstant(itemLevel);
  const revealPotentialCost = revealCostConst * itemLevel ** 2;
  return cubeCost * totalCubeCount + totalCubeCount * revealPotentialCost;
};
const lineCount = ref(3);
const selectionRates = computed(() => {
  if (multipleSelection.value.length === 0) {
    return "勾选想要的属性，计算平均消耗";
  }
  let total1 = 0, total2 = 0, total3 = 0;
  for (const selection of multipleSelection.value) {
    total1 += selection.first_line;
    total2 += selection.second_line;
    total3 += selection.third_line;
  }
  let totalRates = 0;
  switch (lineCount.value) {
  case 1:
    totalRates = 1000000.0 - (100 - total1) * (100 - total2) * (100 - total3);
    break;
  case 2:
    totalRates = (total1 * total2 + total1 * total3 + total2 * total3) * 100;
    totalRates = totalRates - 2 * total1 * total2 * total3;
    break;
  case 3:
    totalRates = total1 * total2 * total3;
  }
  if (totalRates === 0) {
    return `不可能至少有${lineCount.value}条属性为所选属性`;
  }
  const cubeCount = 1000000.0 / totalRates;
  const mesoCount = cubingCost(form.type, form.itemLevel, cubeCount) / 1e9;
  const cubeType = form.type === "red" ? "Glowing/Red" : "Bright/Black";
  return `至少有 ${lineCount.value} 条属性为所选属性，平均需要： ${cubeCount.toFixed(0)} 个 ${cubeType} 魔方，共计 ${mesoCount.toFixed(2)} B Mesos`;
});

const buildLine = ([lineType, lineValue]: RatesLineData, combineJunk: boolean = false) => {
  let t = lineType;
  if (form.itemLevel > 150 && plusOneLine.includes(t)) {
    const v = lineValue as number;
    if (t !== "Critical Chance %" || v < 12) {
      lineValue = v + 1;
    }
  }
  if (t === "Critical Chance %") {
    t = "Critical Rate %"
  } else if (t === "Meso Amount %") {
    t = "Mesos Obtained %"
  }
  let important = importantOther;
  if (["weapon", "secondary", "emblem"].includes(form.position[1])) {
    important = importantWse;
  }
  if (combineJunk && !important.includes(t)) {
    t = "Junk";
  }
  if (t === "Junk") {
    t = "垃圾属性";
    if (!combineJunk) {
      const v = lineValue as string[];
      t = v[Math.floor(Math.random() * v.length)];
    }
  } else if (typeof lineValue === "string") {
    t = lineValue;
  } else if (t.includes("Flat")) {
    t = t.replace("Flat", ` : +${lineValue}`);
  } else if (t.includes(" %")) {
    t = t.replace(" %", ` : +${lineValue}%`);
  } else if (t === "Boss Damage") {
    t = `${t} : +${lineValue}%`;
  } else {
    t = `${t} : ${lineValue}s`;
  }
  return t;
};

const selectable = (row: RateLine) => row.text !== "垃圾属性";
const tableData = computed(() => {
  const result: RateLine[] = [];
  const rate = cubeRates.lvl120to200[form.position[1]][form.type].legendary;
  const rates = [rate.first_line, rate.second_line, rate.third_line];
  let index = 0;
  for (let i = 0; i < rates.length; i++) {
    for (const line of rates[i]) {
      let lineType = line[0];
      const lineType0 = lineType;
      let lineValue = line[1];
      const lineRate = line[2];
      lineType = buildLine(line, true);
      if (typeof lineValue !== "number") {
        lineValue = 0;
      }
      let v = result.find((value) => value.text === lineType);
      if (!v) {
        v = {id: index++, text: lineType, type: lineType0, value: lineValue, first_line: 0, second_line: 0, third_line: 0};
        result.push(v);
      }
      if (i === 0) v.first_line += lineRate;
      else if (i === 1) v.second_line += lineRate;
      else v.third_line += lineRate;
    }
  }
  return result.sort((a, b) => {
    if (a.text === "垃圾属性" && b.text !== "垃圾属性") return 1;
    if (a.text !== "垃圾属性" && b.text === "垃圾属性") return -1;
    if (a.type === "All Stats %" && b.type !== "All Stats %") return -1;
    if (a.type !== "All Stats %" && b.type === "All Stats %") return 1;
    const ret = a.type.length - b.type.length;
    if (ret === 0) {
      return b.value - a.value;
    }
    return ret;
  });
});

interface FormData {
  type: CubeType,
  trials: number,
  position: [string, EquipmentPosition],
  itemLevel: number,
}

const form = reactive<FormData>({
  type: "red",
  trials: 0,
  position: ["wse", "weapon"],
  itemLevel: 200,
});

const position = [
  {
    value: "wse", label: "三大件", children: [
      {value: "weapon", label: "武器"},
      {value: "secondary", label: "副武器"},
      {value: "emblem", label: "纹章"},
    ]
  },
  {
    value: "armor", label: "防具", children: [
      {value: "hat", label: "帽子"},
      {value: "overall", label: "套服"},
      {value: "top", label: "上衣"},
      {value: "bottom", label: "裙/裤"},
      {value: "shoulder", label: "护肩"},
      {value: "gloves", label: "手套"},
      {value: "shoes", label: "鞋子"},
      {value: "cape", label: "披风"},
    ]
  },
  {
    value: "accessory", label: "饰品", children: [
      {value: "ring", label: "首饰"},
      {value: "belt", label: "腰带"},
      {value: "heart", label: "心脏"},
    ]
  },
];

const cost = computed(() => {
  const result = cubingCost(form.type, form.itemLevel, try_count.value) / 1e6;
  return result < 100 ? (result/1000).toFixed(3) : (result/1000).toPrecision(3);
});

const try_count = ref(0);
const try_result = ref([]);

const plusOneLine = ["ATT %", "MATT %", "STR %", "DEX %", "INT %", "LUK %", "All Stats %", "Max HP %", "Critical Chance %"];
const importantWse = ["ATT %", "MATT %", "Boss Damage", "Ignore Enemy Defense %"];
const importantOther = ["STR %", "DEX %", "INT %", "LUK %", "All Stats %", "Max HP %", "Item Drop Rate %", "Meso Amount %"];
const doStuff0 = () => {
  if (try_count.value > 0) {
    let important = importantOther;
    if (["weapon", "secondary", "emblem"].includes(form.position[1])) {
      important = importantWse;
    }
    const attrType = try_result.value[0].line[0];
    if (important.includes(attrType) && try_result.value[1].line[0] == attrType && try_result.value[2].line[0] == attrType) {
      ElMessageBox.confirm(
        "三条相同属性，要继续重置吗？",
        {
          confirmButtonText: '点！',
          cancelButtonText: '不了',
          type: 'warning',
          closeOnClickModal: false,
        }
      ).then(() => {
        doStuff();
      }).catch(() => {});
      return;
    }
  }
  doStuff();
};

const MAX_CATEGORY_COUNT = {
  "Decent Skill": 1,
  "Increase invincibility time after being hit": 1,
  "Chance to ignore % damage when hit": 2,
  "Chance of being invincible for seconds when hit": 2,
};

const doStuff = () => {
  try_count.value += 1;
  const rate = cubeRates.lvl120to200[form.position[1]][form.type].legendary;
  const rates = [rate.first_line, rate.second_line, rate.third_line];
  const a = [];
  while (a.length < rates.length) {
    let r = Math.random() * 100;
    for (const line of rates[a.length]) {
      const lineRate = line[2];
      if (r < lineRate) {
        const maxCount = MAX_CATEGORY_COUNT[line[0]];
        if (maxCount !== undefined) {
          const count = a.filter((item) => item.line[0] === line[0]).length;
          if (count >= maxCount) {
            break;
          }
        }
        const t = buildLine(line);
        a.push({text: t, line: line});
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
<style>
.popper_custom_height_8 .el-scrollbar__wrap {
  height: 285px;
}
</style>
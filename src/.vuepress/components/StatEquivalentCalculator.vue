<template>
  <el-row class="row">
    <el-card header="link" class="card">
      <div class="input">
        <el-checkbox
          v-model="data.link.solus2"
          label="亚克link2(11%伤)"
          @change="() => { if(data.link.solus2) data.link.solus3 = false }"
        />
        <el-checkbox
          v-model="data.link.solus3"
          label="亚克link3(16%伤)"
          @change="() => { if(data.link.solus3) data.link.solus2 = false }"
        />
        <el-checkbox v-model="data.link.ua" label="链子link(12%伤)" />
        <el-checkbox v-model="data.link.ek" label="冒险家法师link(9%伤9%无视)" />
        <el-checkbox v-model="data.link.tc" label="冒险家飞侠link(18%伤半程)" />
        <el-checkbox v-model="data.link.tob" label="黑皮link(12%伤)" />
        <el-checkbox v-model="data.link.ttp" label="卡因link(17%伤半程)" />
      </div>
    </el-card>
    <el-card header="主属性" class="card">
      <div class="input">
        <el-text class="mx-1">Base Value</el-text>
        <el-input v-model.number="data.mainAttr.base" type="number" :min="0" />
      </div>
      <div class="input">
        <el-text class="mx-1">% Value</el-text>
        <el-input v-model.number="data.mainAttr.percent" type="number" :min="0">
          <template #suffix> % </template>
        </el-input>
      </div>
      <div class="input">
        <el-text class="mx-1">% Value Not Applied</el-text>
        <el-input
          v-model.number="data.mainAttr.percentNotApplied"
          type="number"
          :min="0"
        />
      </div>
      <div class="input">
        <el-text>面板总值：{{ totalMainAttr }}</el-text>
      </div>
    </el-card>
    <el-card header="副属性" class="card">
      <div class="input">
        <el-text class="mx-1">Base Value</el-text>
        <el-input v-model.number="data.subAttr.base" type="number" :min="0" />
      </div>
      <div class="input">
        <el-text class="mx-1">% Value</el-text>
        <el-input v-model.number="data.subAttr.percent" type="number" :min="0">
          <template #suffix>%</template>
        </el-input>
      </div>
      <div class="input">
        <el-text class="mx-1">% Value Not Applied</el-text>
        <el-input
          v-model.number="data.subAttr.percentNotApplied"
          type="number"
          :min="0"
        />
      </div>
      <div class="input">
        <el-text>面板总值：{{ totalSubAttr }}</el-text>
      </div>
    </el-card>
    <el-card header="ATT/MATT" class="card">
      <div class="input">
        <el-text class="mx-1">Base Value</el-text>
        <el-input v-model.number="data.att.base" type="number" :min="0" />
      </div>
      <div class="input">
        <el-text class="mx-1">% Value</el-text>
        <el-input v-model.number="data.att.percent" type="number" :min="0">
          <template #suffix>%</template>
        </el-input>
      </div>
      <div class="input">
        <el-text>面板总值：{{ totalAtt }}</el-text>
      </div>
    </el-card>
    <el-card header="伤害类" class="card">
      <div class="input">
        <el-text class="mx-1">DAMAGE</el-text>
        <el-input v-model.number="data.damage" type="number" :min="0">
          <template #suffix> % </template>
        </el-input>
      </div>
      <div class="input">
        <el-text class="mx-1">BOSS DAMAGE</el-text>
        <el-input v-model.number="data.bossDamage" type="number" :min="0">
          <template #suffix>%</template>
        </el-input>
      </div>
      <div class="input">
        <el-text class="mx-1">CRITICAL DAMAGE</el-text>
        <el-input v-model.number="data.criticalDamage" type="number" :min="0">
          <template #suffix>%</template>
        </el-input>
      </div>
    </el-card>
    <el-card header="无视防御" class="card">
      <div class="input">
        <el-text class="mx-1">IGNORE DEFENSE</el-text>
        <el-input
          v-model.number="data.ignoreDefense"
          type="number"
          :min="0"
          :max="100"
        >
          <template #suffix>%</template>
        </el-input>
      </div>
      <div class="input">
        <el-text class="mx-1">目标BOSS防御率</el-text>
        <el-radio-group v-model="data.enemyDefense">
          <el-radio :value="300">300%</el-radio>
          <el-radio :value="380">380%</el-radio>
        </el-radio-group>
      </div>
    </el-card>
  </el-row>
  <div>
    <div class="input">
      <el-text class="mx-1">1主属性 = {{
        (mainAttrBaseIncr / mainAttrPercentNotAppliedIncr).toPrecision(3)
      }} 不吃百分比加成的主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1 主属性 = {{
        (mainAttrBaseIncr / subAttrBaseIncr).toPrecision(3)
      }} 副属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1% 主属性 = {{
        (mainAttrPercentIncr / mainAttrBaseIncr).toPrecision(3)
      }} 主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1% 全属性 = {{
        (allAttrPercentIncr / mainAttrBaseIncr).toPrecision(3)
      }} 主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1G = {{
        (attBaseIncr / mainAttrBaseIncr).toPrecision(3)
      }} 主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1G% = {{
        (attPercentIncr / mainAttrBaseIncr).toPrecision(3)
      }} 主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1% Damage / 1% BD = {{
        (damageIncr / mainAttrBaseIncr).toPrecision(3)
      }} 主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1% 爆伤 = {{
        (criticalDamageIncr / mainAttrBaseIncr).toPrecision(3)
      }} 主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1% 无视 = {{
        (ignoreDefenseIncr / mainAttrBaseIncr).toPrecision(3)
      }} 主属性</el-text>
    </div>
    <div class="input">
      <el-button type="danger" @click="Object.assign(data, default_data)">全部还原为默认值</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, watch } from "vue";
import {
  ElCard,
  ElInput,
  ElRow,
  ElText,
  ElRadioGroup,
  ElRadio,
  ElCheckbox,
  ElButton,
} from "element-plus";

const default_data = {
  link: {
    solus2: false,
    solus3: false,
    ua: false,
    ek: false,
    tc: false,
    tob: false,
    ttp: false,
  },
  mainAttr: {
    base: 4244,
    percent: 382,
    percentNotApplied: 14810,
  },
  subAttr: {
    base: 2232,
    percent: 141,
    percentNotApplied: 280,
  },
  att: {
    base: 1948,
    percent: 66,
    percentNotApplied: 0,
  },
  damage: 331,
  bossDamage: 481,
  criticalDamage: 130,
  ignoreDefense: 97,
  enemyDefense: 300,
};

const data = reactive({
  ...default_data,
});

interface Attr {
  base: number;
  percent: number;
  percentNotApplied: number;
}

const calTotal = (attr: Attr) => {
  return attr.base * (1 + attr.percent / 100) + attr.percentNotApplied;
};

const totalMainAttr = computed(() => {
  return Math.floor(calTotal(data.mainAttr));
});

const totalSubAttr = computed(() => {
  return Math.floor(calTotal(data.subAttr));
});

const totalAtt = computed(() => {
  return Math.floor(calTotal(data.att));
});

const calTotalAttr = (mainAttr: Attr, subAttr: Attr) => {
  return calTotal(mainAttr) * 4 + calTotal(subAttr);
};

const mainAttrBaseIncr = computed(() => {
  const mainAttr2 = { ...data.mainAttr };
  mainAttr2.base++;
  const oldV = calTotalAttr(data.mainAttr, data.subAttr);
  const newV = calTotalAttr(mainAttr2, data.subAttr);
  return (newV - oldV) / oldV;
});

const mainAttrPercentIncr = computed(() => {
  const mainAttr2 = { ...data.mainAttr };
  mainAttr2.percent++;
  const oldV = calTotalAttr(data.mainAttr, data.subAttr);
  const newV = calTotalAttr(mainAttr2, data.subAttr);
  return (newV - oldV) / oldV;
});

const allAttrPercentIncr = computed(() => {
  const mainAttr2 = { ...data.mainAttr };
  const subAttr2 = { ...data.subAttr };
  mainAttr2.percent++;
  subAttr2.percent++;
  const oldV = calTotalAttr(data.mainAttr, data.subAttr);
  const newV = calTotalAttr(mainAttr2, subAttr2);
  return (newV - oldV) / oldV;
});

const mainAttrPercentNotAppliedIncr = computed(() => {
  const mainAttr2 = { ...data.mainAttr };
  mainAttr2.percentNotApplied++;
  const oldV = calTotalAttr(data.mainAttr, data.subAttr);
  const newV = calTotalAttr(mainAttr2, data.subAttr);
  return (newV - oldV) / oldV;
});

const subAttrBaseIncr = computed(() => {
  const subAttr2 = { ...data.subAttr };
  subAttr2.base++;
  const oldV = calTotalAttr(data.mainAttr, data.subAttr);
  const newV = calTotalAttr(data.mainAttr, subAttr2);
  return (newV - oldV) / oldV;
});

const attBaseIncr = computed(() => {
  return 1 / data.att.base;
});

const attPercentIncr = computed(() => {
  return 1 / (100 + data.att.percent);
});

const damageIncr = computed(() => {
  let link = 0;
  if (data.link.solus2) {
    link += 11
  }
  if (data.link.solus3) {
    link += 16
  }
  if (data.link.ua) {
    link += 12
  }
  if (data.link.ek) {
    link += 9
  }
  if (data.link.tc) {
    link += 18 / 2
  }
  if (data.link.tob) {
    link += 12
  }
  if (data.link.ttp) {
    link += 17 / 2
  }
  return 1 / (100 + data.damage + data.bossDamage + link);
});

const criticalDamageIncr = computed(() => {
  return 1 / (135 + data.criticalDamage);
});

const ignoreDefenseIncr = computed(() => {
  const link = data.link.ek ? 0.91 : 1
  const oldV = 100 - (data.enemyDefense * (100 - data.ignoreDefense)) / 100 * link;
  const newV =
      100 - ((data.enemyDefense * (100 - data.ignoreDefense)) / 100) * 0.99 * link;
  return (newV - oldV) / oldV;
});

watch(data, () => {
  localStorage.setItem("StatEquivalentCalculatorData", JSON.stringify(data));
});

onMounted(() => {
  const StatEquivalentCalculatorData = localStorage.getItem(
    "StatEquivalentCalculatorData"
  );
  if (StatEquivalentCalculatorData) {
    const v = JSON.parse(StatEquivalentCalculatorData);
    Object.assign(data, v);
  }
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
<template>
  <div class="input">
    <el-popover
      placement="top-start"
      width="max-content"
      trigger="hover"
      content=""
    >
      <template #reference>
        <el-text type="primary" tag="ins">查看如何使用</el-text>
      </template>
      <div class="input">
        <el-text>如果你想计算常态下的属性等价，就把常态buff加满(包括buff药)。</el-text>
      </div>
      <div class="input">
        <el-text>同理如果你想计算爆发状态下的属性等价，就把爆发buff也加满。</el-text>
      </div>
      <div class="input">
        <el-text>如果有战斗中才能叠加的buff(例如Ark的link)，请先自行叠满。</el-text>
      </div>
      <div class="input">
        <el-text>如果对敌人的debuff，请先自行手动加上，本工具后续再优化。</el-text>
      </div>
      <div class="input">
        <el-text>你可以利用BOSS练习模式吃上免费的buff药水来观察面板。</el-text>
      </div>
    </el-popover>
  </div>
  <el-row class="row">
    <el-card header="主属性" class="card">
      <div class="input">
        <el-text class="mx-1">Base Value</el-text>
        <el-input v-model="data.mainAttr.base" type="number" :min="0" />
      </div>
      <div class="input">
        <el-text class="mx-1">% Value</el-text>
        <el-input v-model="data.mainAttr.percent" type="number" :min="0">
          <template #suffix>
            <el-icon>%</el-icon>
          </template>
        </el-input>
      </div>
      <div class="input">
        <el-text class="mx-1">% Value Not Applied</el-text>
        <el-input v-model="data.mainAttr.percentNotApplied" type="number" :min="0" />
      </div>
      <div class="input">
        <el-text>面板总值：{{ totalMainAttr }}</el-text>
      </div>
    </el-card>
    <el-card header="副属性" class="card">
      <div class="input">
        <el-text class="mx-1">Base Value</el-text>
        <el-input v-model="data.subAttr.base" type="number" :min="0" />
      </div>
      <div class="input">
        <el-text class="mx-1">% Value</el-text>
        <el-input v-model="data.subAttr.percent" type="number" :min="0">
          <template #suffix><el-icon>%</el-icon></template>
        </el-input>
      </div>
      <div class="input">
        <el-text class="mx-1">% Value Not Applied</el-text>
        <el-input v-model="data.subAttr.percentNotApplied" type="number" :min="0" />
      </div>
      <div class="input">
        <el-text>面板总值：{{ totalSubAttr }}</el-text>
      </div>
    </el-card>
    <el-card header="ATT/MATT" class="card">
      <div class="input">
        <el-text class="mx-1">Base Value</el-text>
        <el-input v-model="data.att.base" type="number" :min="0" />
      </div>
      <div class="input">
        <el-text class="mx-1">% Value</el-text>
        <el-input v-model="data.att.percent" type="number" :min="0">
          <template #suffix><el-icon>%</el-icon></template>
        </el-input>
      </div>
      <div class="input">
        <el-text>面板总值：{{ totalAtt }}</el-text>
      </div>
    </el-card>
    <el-card header="伤害类" class="card">
      <div class="input">
        <el-text class="mx-1">DAMAGE</el-text>
        <el-input v-model="data.damage" type="number" :min="0">
          <template #suffix>
            <el-icon>%</el-icon>
          </template>
        </el-input>
      </div>
      <div class="input">
        <el-text class="mx-1">BOSS DAMAGE</el-text>
        <el-input v-model="data.bossDamage" type="number" :min="0">
          <template #suffix><el-icon>%</el-icon></template>
        </el-input>
      </div>
      <div class="input">
        <el-text class="mx-1">CRITICAL DAMAGE</el-text>
        <el-input v-model="data.criticalDamage" type="number" :min="0">
          <template #suffix><el-icon>%</el-icon></template>
        </el-input>
      </div>
    </el-card>
    <el-card header="无视防御" class="card">
      <div class="input">
        <el-text class="mx-1">IGNORE DEFENSE</el-text>
        <el-input
          v-model="data.ignoreDefense"
          type="number"
          :min="0"
          :max="100"
        >
          <template #suffix><el-icon>%</el-icon></template>
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
      <el-text class="mx-1">1主属性={{ (mainAttrBaseIncr/mainAttrPercentNotAppliedIncr).toPrecision(3) }}不吃百分比加成的主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1主属性={{ (mainAttrBaseIncr/subAttrBaseIncr).toPrecision(3) }}副属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1主属性%={{ (mainAttrPercentIncr/mainAttrBaseIncr).toPrecision(3) }}主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1全属性%={{ (allAttrPercentIncr/mainAttrBaseIncr).toPrecision(3) }}主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1G={{ (attBaseIncr/mainAttrBaseIncr).toPrecision(3) }}主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1G%={{ (attPercentIncr/mainAttrBaseIncr).toPrecision(3) }}主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1% Damage / 1% BD={{ (damageIncr/mainAttrBaseIncr).toPrecision(3) }}主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1%爆伤={{ (criticalDamageIncr/mainAttrBaseIncr).toPrecision(3) }}主属性</el-text>
    </div>
    <div class="input">
      <el-text class="mx-1">1无视%={{ (ignoreDefenseIncr/mainAttrBaseIncr).toPrecision(3) }}主属性</el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, computed, onMounted, watch} from "vue";
import {ElCard, ElInput, ElPopover, ElRow, ElText, ElRadioGroup, ElRadio} from "element-plus";

const data = reactive({
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
  const newV = calTotalAttr(mainAttr2, subAttr2)
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
  return 1 / data.att.base
});

const attPercentIncr = computed(() => {
  return 1 / (100 + data.att.percent)
});

const damageIncr = computed(() => {
  return 1 / (100 + data.damage + data.bossDamage)
});

const criticalDamageIncr = computed(() => {
  return 1 / (135 + data.criticalDamage)
});

const ignoreDefenseIncr = computed(() => {
  const oldV = 100 - data.enemyDefense * (100 - data.ignoreDefense) / 100
  const newV = 100 - data.enemyDefense * (100 - data.ignoreDefense) / 100 * 0.99
  return (newV - oldV) / oldV;
});

watch(data, () => {
  localStorage.setItem("StatEquivalentCalculatorData", JSON.stringify(data));
});

onMounted(() => {
  const StatEquivalentCalculatorData = localStorage.getItem("StatEquivalentCalculatorData");
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

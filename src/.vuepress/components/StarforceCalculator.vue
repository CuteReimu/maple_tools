<template>
  <el-form :model="form" label-width="auto">
    <el-form-item label="工具：">
      <el-radio-group v-model="form.type" fill="#f59139">
        <el-radio-button value="try" name="type">
          模拟升星
        </el-radio-button>
        <el-radio-button value="calc" name="type">
          上星期望
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="道具等级：">
      <el-input-number
        v-model="form.itemLevel"
        :min="0"
        :max="300"
        :step="10"
        controls-position="right"
        :disabled="form.type=='try'"
      />
    </el-form-item>
    <el-form-item label="功能：">
      <el-checkbox-group v-model="form.misc">
        <el-checkbox value="starcatching" name="misc">
          抓星星
        </el-checkbox>
        <el-checkbox value="safeguard" name="misc">
          保护
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="星数：">
      <el-input-number
        v-model="form.cur_stars"
        :min="0"
        :max="form.server=='kms'?30:25"
        controls-position="right"
        :disabled="form.type=='try'&&show_try"
      />
      <el-text style="margin: 0 10px 0 10px;">-</el-text>
      <el-input-number
        v-model="form.target_stars"
        :min="0"
        :max="form.server=='kms'?30:25"
        controls-position="right"
        @change="onUpdateTargetStars"
      />
    </el-form-item>
    <el-form-item label="MVP折扣：">
      <el-select
        v-model="form.mvp"
        style="width: 240px"
        :disabled="form.type=='try'"
      >
        <el-option label="无" value="none" />
        <el-option label="白银MVP（1-16星3%折扣）" value="silver" />
        <el-option label="黄金MVP（1-16星5%折扣）" value="gold" />
        <el-option label="钻石MVP（1-16星10%折扣）" value="diamond" />
      </el-select>
    </el-form-item>
    <el-form-item label="服务器：">
      <el-select
        v-model="form.server"
        style="width: 240px"
        :disabled="form.type=='try'&&show_try"
        @change="onUpdateServer"
      >
        <el-option label="GMS/JMS/SEA" value="gms" />
        <el-option label="KMS" value="kms" />
        <el-option label="TMS" value="tms" />
        <el-option label="TMS Reboot" value="tmsr" />
        <el-option label="怀旧服" value="old" />
      </el-select>
    </el-form-item>
    <el-form-item label="活动：">
      <el-checkbox-group v-model="form.events">
        <el-checkbox value="five_ten_fifteen" name="events" :disabled="form.server=='kms'">
          5/10/15必成
        </el-checkbox>
        <el-checkbox value="plus2" name="events" :disabled="form.server=='kms'">
          10星前一次2星
        </el-checkbox>
        <el-checkbox v-if="form.type=='calc'" value="thirty_off" name="events">
          花费七折
        </el-checkbox>
        <el-checkbox value="boom_event" name="events" :disabled="form.server!='kms'">
          爆炸几率减少30%
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="尝试次数：">
      <el-input-number
        v-model="form.trials"
        :min="0"
        :step="100"
        controls-position="right"
        :disabled="form.type=='try'"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        v-if="form.type=='calc'"
        size="large"
        type="warning"
        :disabled="form.trials<=0"
        @click="doStuff"
      >
        <template #icon>
          <VPIcon icon="calculator" />
        </template>
        计算
      </el-button>
      <el-button
        v-if="form.type=='try'"
        size="large"
        type="warning"
        :disabled="cannot_try"
        @click="tryOnce"
      >
        点！
      </el-button>
      <el-button
        v-if="form.type=='try'"
        size="large"
        type="danger"
        @click="resetTryOnce"
      >
        重置
      </el-button>
      <el-text
        v-if="form.type=='try' && show_try"
        size="large"
        style="margin-left: 10px;"
      >
        {{ try_result }}
      </el-text>
    </el-form-item>
  </el-form>
  <el-row v-if="show_calc" class="row">
    <el-card>
      <div>
        <el-text class="mx-1" size="large" style="font-weight: bold;">Mesos统计</el-text>
      </div>
      <div>
        <el-text class="mx-1">消耗平均值：{{ mesos_result.average }}</el-text>
      </div>
      <div>
        <el-text class="mx-1">消耗中位数：{{ mesos_result.median }}</el-text>
      </div>
      <div>
        <el-text class="mx-1">消耗区间：{{ mesos_result.min }} - {{ mesos_result.max }}</el-text>
      </div>
    </el-card>
    <el-card>
      <div>
        <el-text class="mx-1" size="large" style="font-weight: bold;">Mesos概率</el-text>
      </div>
      <div>
        <el-text class="mx-1">75%置信概率在 {{ mesos_result.seventy_fifth_percentile }} mesos以内</el-text>
      </div>
      <div>
        <el-text class="mx-1">85%置信概率在 {{ mesos_result.eighty_fifth_percentile }} mesos以内</el-text>
      </div>
      <div>
        <el-text class="mx-1">95%置信概率在 {{ mesos_result.ninty_fifth_percentile }} mesos以内</el-text>
      </div>
    </el-card>
    <el-card>
      <div>
        <el-text class="mx-1" size="large" style="font-weight: bold;">爆炸次数统计</el-text>
      </div>
      <div>
        <el-text class="mx-1">爆炸次数平均值：{{ booms_result.average }}</el-text>
      </div>
      <div>
        <el-text class="mx-1">爆炸次数中位数：{{ booms_result.median }}</el-text>
      </div>
      <div>
        <el-text class="mx-1">爆炸次数区间：{{ booms_result.min }} - {{ booms_result.max }}</el-text>
      </div>
    </el-card>
    <el-card>
      <div>
        <el-text class="mx-1" size="large" style="font-weight: bold;">爆炸次数概率</el-text>
      </div>
      <div>
        <el-text class="mx-1">75%置信概率爆炸次数在 {{ booms_result.seventy_fifth_percentile }} 以内</el-text>
      </div>
      <div>
        <el-text class="mx-1">85%置信概率爆炸次数在 {{ booms_result.eighty_fifth_percentile }} 以内</el-text>
      </div>
      <div>
        <el-text class="mx-1">95%置信概率爆炸次数在 {{ booms_result.ninty_fifth_percentile }} 以内</el-text>
      </div>
    </el-card>
  </el-row>
  <Bar
    v-if="show_calc"
    id="boom-chart"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script setup lang="ts">
import {computed, h, reactive, ref} from "vue";
import {
  ElCard, ElText, ElRow,
  ElInputNumber, ElSelect, ElOption,
  ElCheckboxGroup, ElCheckbox, ElRadioGroup, ElRadioButton,
  ElForm, ElFormItem, ElButton, ElMessage,
} from "element-plus";
import {
  getRates, grabColumnColors,
  percentile, repeatExperiment,
  determineOutcome, checkChanceTime,
} from "./StarforceCalculator.js";
import {Bar} from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartData
} from 'chart.js'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

const chartData = computed<ChartData<"bar">>(() => {
  let boomMap = boomChartResult.value.boomResultList.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  let colorMatrix = Array.from(boomMap.keys()).map(key => {
    return grabColumnColors(key, boomChartResult.value.boomPercentiles);
  });

  let backgroundArray = colorMatrix.map(el => el.background);
  let borderArray = colorMatrix.map(el => el.border);

  return {
    labels: Array.from(boomMap.keys()),
    datasets: [{
      data: Array.from(boomMap.values()),
      backgroundColor: backgroundArray,
      borderColor: borderArray,
      borderWidth: 1
    }]
  };
});
const chartOptions: ChartOptions<"bar"> = {
  plugins: {
    title: {
      display: true,
      text: '频率直方图',
      padding: {
        top: 30,
        bottom: 20
      },
      font: {size: 20}
    },
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        title: (context) => context[0].label + " 次爆炸",
        label: function ({raw, dataset}) {
          let trialsAmount = 0;
          for (let i = 0; i < dataset.data.length; i++) {
            trialsAmount += dataset.data[i] as number;
          }
          return `出现 ${raw} 次 (${raw as number * 100 / trialsAmount}%)`;
        },
      }
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: '爆炸次数',
        font: {size: 18},
      }
    },
    y: {}
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

const onUpdateTargetStars = () => {
  if (form.type == 'calc' && form.target_stars > 22) {
    ElMessage({
      message: h('p', {
        class: 'el-message__content',
        style: 'font-size: unset;'
      }, '由于22星以上的升星概率非常低，如果你试图升星超过22颗星，计算器可能会崩溃。'),
      type: 'warning',
    });
  }
};

const onUpdateServer = () => {
  if (form.server === 'kms') {
    form.events = form.events.filter(e => e !== 'five_ten_fifteen');
    form.events = form.events.filter(e => e !== 'plus2');
  } else {
    form.events = form.events.filter(e => e !== 'boom_event');
  }
};

const form = reactive({
  type: "try",
  itemLevel: 200,
  misc: ["starcatching"],
  cur_stars: 0,
  target_stars: 22,
  mvp: "none",
  server: "gms",
  events: [],
  trials: 1000,
});

const show_try = ref(false);
let decrease_count = 0;
let total_count = 0;
const item_destroyed = ref(false);
const try_result = ref("");
const cannot_try = computed(() =>
  item_destroyed.value || form.cur_stars >= form.target_stars
);

const show_calc = ref(false);
const mesos_result = ref({
  average: "",
  median: "",
  min: "",
  max: "",
  seventy_fifth_percentile: "",
  eighty_fifth_percentile: "",
  ninty_fifth_percentile: "",
});
const booms_result = ref({
  average: "",
  median: "",
  min: "",
  max: "",
  seventy_fifth_percentile: "",
  eighty_fifth_percentile: "",
  ninty_fifth_percentile: "",
});
const boomChartResult = ref({
  boomPercentiles: {
    median_booms: "",
    seventy_fifth_percentile_boom: "",
    eighty_fifth_percentile_boom: "",
    ninty_fifth_percentile_boom: "",
  },
  boomResultList: [],
})

const doStuff = () => {
  const item_level = form.itemLevel;
  const item_type = 'normal';
  const current_star = form.cur_stars;
  const desired_star = form.target_stars;
  const boom_protect = form.misc.includes('safeguard');
  const star_catch = form.misc.includes('starcatching');
  const boom_event = form.events.includes('boom_event');
  const mvp = form.mvp;
  const sauna = false;
  const total_trials = form.trials;
  const thirty_off = form.events.includes('thirty_off');
  const five_ten_fifteen = form.events.includes('five_ten_fifteen');
  const two_plus = form.events.includes('plus2');
  const useAEE = false
  const server = form.server;

  const rates = getRates(server, item_type, useAEE);

  const silver = mvp === 'silver';
  const gold = mvp === 'gold';
  const diamond = mvp === 'diamond';

  const result = repeatExperiment(total_trials, current_star, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server, boom_event);
  //result = [average_cost, average_booms, meso_result_list, boom_result_list, median_cost, median_booms, max_cost, min_cost, max_booms, min_booms, meso_std, boom_std, meso_result_list_divided]

  const meso_result_list = result[2];
  const boom_result_list = result[3];

  mesos_result.value = {
    average: result[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    median: result[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    min: result[7].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    max: result[6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    seventy_fifth_percentile: (percentile(meso_result_list, 0.75).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    eighty_fifth_percentile: (percentile(meso_result_list, 0.85).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    ninty_fifth_percentile: (percentile(meso_result_list, 0.95).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  }
  booms_result.value = {
    average: result[1],
    median: result[5],
    min: result[9],
    max: result[8],
    seventy_fifth_percentile: (percentile(boom_result_list, 0.75).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    eighty_fifth_percentile: (percentile(boom_result_list, 0.85).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    ninty_fifth_percentile: (percentile(boom_result_list, 0.95).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  }

  boomChartResult.value = {
    boomResultList: boom_result_list,
    boomPercentiles: {
      median_booms: booms_result.value.median,
      seventy_fifth_percentile_boom: booms_result.value.seventy_fifth_percentile,
      eighty_fifth_percentile_boom: booms_result.value.eighty_fifth_percentile,
      ninty_fifth_percentile_boom: booms_result.value.ninty_fifth_percentile,
    },
  }
  show_try.value = false;
  show_calc.value = true;
};

const resetTryOnce = () => {
  show_try.value = false;
  item_destroyed.value = false;
  total_count = 0;
  decrease_count = 0;
  if (form.cur_stars >= form.target_stars) {
    form.cur_stars = 0;
  }
};

const tryOnce = () => {
  const item_type = 'normal';
  let current_star = form.cur_stars;
  const boom_protect = form.misc.includes('safeguard');
  const star_catch = form.misc.includes('starcatching');
  const boom_event = form.events.includes('boom_event');
  const sauna = false;
  const five_ten_fifteen = form.events.includes('five_ten_fifteen');
  const two_plus = form.events.includes('plus2');
  const useAEE = false
  const server = form.server;

  const rates = getRates(server, item_type, useAEE);

  let chanceTime: boolean;
  let outcome: string;
  if (useAEE) {
    chanceTime = false;
  } else {
    chanceTime = false
    if (server !== 'kms') chanceTime = checkChanceTime(decrease_count);
  }

  if (chanceTime) {
    outcome = `强化成功！升到${current_star}星！`
    decrease_count = 0;
    if (two_plus && current_star <= 10) {
      current_star = current_star + 2;
    } else {
      current_star++
    }
  } else {
    outcome = determineOutcome(current_star, rates, star_catch, boom_protect, five_ten_fifteen, sauna, item_type, server, boom_event);

    if (outcome === "Success") {
      decrease_count = 0;
      if (two_plus && current_star <= 10) {
        current_star = current_star + 2;
      } else {
        current_star++
      }
      outcome = `强化成功！升到${current_star}星！`
    } else if (outcome === "Decrease") {
      decrease_count++;
      current_star--;
      outcome = `强化失败！掉到${current_star}星！`
    } else if (outcome === "Maintain") {
      decrease_count = 0;
      outcome = `强化失败！维持${current_star}星！`
    } else if (outcome === "Boom") {
      decrease_count = 0;
      current_star = 12;
      outcome = `强化失败！装备损毁！`
      item_destroyed.value = true;
    }
  }

  if (chanceTime) {
    outcome += "机会时间！"
  }

  outcome += `共计点了${++total_count}次`;
  form.cur_stars = current_star;
  try_result.value = outcome;
  show_calc.value = false;
  show_try.value = true;
}
</script>

<style scoped>
.el-form-item {
  margin-bottom: 9px;
}

.el-card {
  text-align: center;
  border-radius: 15px;
  background: linear-gradient(-45deg, rgba(114, 34, 121, 1) 10%, #f59139 90%);
}

.mx-1 {
  color: #CFD3DC;
}

.row {
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-width: 960px;
}

@media (max-width: 710px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
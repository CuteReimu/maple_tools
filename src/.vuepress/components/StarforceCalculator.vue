<template>
  <el-form :model="form" label-width="auto">
    <el-form-item label="道具等级：">
      <el-input-number
        v-model="form.itemLevel"
        :min="0"
        :max="300"
        :step="10"
        controls-position="right"
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
    <el-form-item label="当前星数：">
      <el-input-number
        v-model="form.cur_stars"
        :min="0"
        :max="form.server=='kms'?30:25"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="目标星数：">
      <el-input-number
        v-model="form.target_stars"
        :min="0"
        :max="form.server=='kms'?30:25"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="MVP折扣：">
      <el-select
        v-model="form.mvp"
        style="width: 240px"
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
        <el-checkbox value="thirty_off" name="events">
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
      />
    </el-form-item>
    <el-form-item>
      <el-button size="large" type="warning" :disabled="form.trials<=0" @click="doStuff">
        <template #icon>
          <VPIcon icon="calculator" />
        </template>
        计算
      </el-button>
    </el-form-item>
  </el-form>
  <el-row class="row" v-if="show">
    <el-card>
      <div><el-text class="mx-1">Mesos Stats</el-text></div>
      <div><el-text class="mx-1">消耗平均值：{{ average_mesos }}</el-text></div>
      <div><el-text class="mx-1">消耗中位数：{{ median_cost }}</el-text></div>
      <div><el-text class="mx-1">消耗区间：{{ min_cost }} - {{ max_cost }}</el-text></div>
    </el-card>
    <el-card>
      <div><el-text class="mx-1">Mesos Percentiles</el-text></div>
      <div><el-text class="mx-1">75%置信概率在{{ seventy_fifth_percentile }} mesos以内</el-text></div>
      <div><el-text class="mx-1">85%置信概率在{{ eighty_fifth_percentile }} mesos以内</el-text></div>
      <div><el-text class="mx-1">95%置信概率在{{ ninty_fifth_percentile }} mesos以内</el-text></div>
    </el-card>
  </el-row>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {
  ElCard, ElText, ElRow,
  ElInputNumber, ElSelect, ElOption,
  ElCheckboxGroup, ElCheckbox,
  ElForm, ElFormItem, ElButton,
} from "element-plus";
import * as Utils from "./StarforceCalculator.js";

const form = reactive({
  itemLevel: 200,
  misc: ["starcatching"],
  cur_stars: 0,
  target_stars: 22,
  mvp: "none",
  server: "gms",
  events: [],
  trials: 1000,
});

const show = ref(false);
const average_mesos = ref("");
const median_cost = ref("");
const min_cost = ref("");
const max_cost = ref("");
const seventy_fifth_percentile = ref("");
const eighty_fifth_percentile = ref("");
const ninty_fifth_percentile = ref("");

const doStuff = () => {
  const item_level = form.itemLevel;
  const item_type = 'normal';
  const current_star = form.cur_stars;
  const desired_star = form.target_stars;
  const region = form.server;
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

  const rates = Utils.getRates(server, item_type, useAEE);

  const silver = mvp === 'silver';
  const gold = mvp === 'gold';
  const diamond = mvp === 'diamond';
  
  const result = Utils.repeatExperiment(total_trials, current_star, desired_star, rates, item_level, boom_protect, thirty_off, star_catch, five_ten_fifteen, sauna, silver, gold, diamond, item_type, two_plus, useAEE, server, boom_event);
  //result = [average_cost, average_booms, meso_result_list, boom_result_list, median_cost, median_booms, max_cost, min_cost, max_booms, min_booms, meso_std, boom_std, meso_result_list_divided]
  average_mesos.value = result[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const average_booms = result[1];

  median_cost.value = result[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const median_booms = result[5];

  const meso_result_list = result[2];
  const meso_result_list_divided = result[12];
  const boom_result_list = result[3];

  max_cost.value = result[6].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  min_cost.value = result[7].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const max_booms = result[8];
  const min_booms = result[9];

  seventy_fifth_percentile.value = (Utils.percentile(meso_result_list, 0.75).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  eighty_fifth_percentile.value = (Utils.percentile(meso_result_list, 0.85).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  ninty_fifth_percentile.value = (Utils.percentile(meso_result_list, 0.95).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const seventy_fifth_percentile_boom = (Utils.percentile(boom_result_list, 0.75).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const eighty_fifth_percentile_boom = (Utils.percentile(boom_result_list, 0.85).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const ninty_fifth_percentile_boom = (Utils.percentile(boom_result_list, 0.95).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  show.value = true;
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 9px;
}

.el-card {
  text-align: center;
  border-radius: 15px;
  background: linear-gradient(-45deg, rgba(114,34,121,1) 10%, #f59139 90%);
}

.mx-1 {
  color: #CFD3DC;
}

.row {
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
}
</style>
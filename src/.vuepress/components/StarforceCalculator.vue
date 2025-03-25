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
      <el-button size="large" type="warning" :disabled="form.trials<=0">
        <template #icon>
          <VPIcon icon="calculator" />
        </template>
        计算
      </el-button>
    </el-form-item>
  </el-form>
  <el-row class="row">
    <el-card>
      <div><el-text class="mx-1">1</el-text></div>
      <div><el-text class="mx-1">1</el-text></div>
      <div><el-text class="mx-1">1</el-text></div>
      <div><el-text class="mx-1">1</el-text></div>
    </el-card>
    <el-card>
      <div><el-text class="mx-1">1</el-text></div>
      <div><el-text class="mx-1">1</el-text></div>
      <div><el-text class="mx-1">1</el-text></div>
      <div><el-text class="mx-1">1</el-text></div>
    </el-card>
  </el-row>
</template>

<script setup lang="ts">
import {reactive, computed, onMounted} from "vue";
import {
  ElCard, ElText, ElRow,
  ElInputNumber, ElSelect, ElOption,
  ElCheckboxGroup, ElCheckbox,
  ElForm, ElFormItem, ElButton,
} from "element-plus";

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
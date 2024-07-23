<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal">
        <el-menu-item index="1">HEXA计算器</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <RouterView/>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {ElMenu, ElMenuItem} from 'element-plus'
import {RouterView} from 'vue-router'

const activeIndex = ref('1')
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

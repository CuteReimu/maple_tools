<template>
  <el-container>
    <el-header>
      <el-menu :default-active="$route.path" mode="horizontal" router>
        <el-menu-item index="/">HEXA计算器</el-menu-item>
        <el-menu-item index="/Symbol">岛球计算器</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {
  ElMenu,
  ElMenuItem,
  ElContainer,
  ElHeader,
  ElMain,
} from "element-plus";
import { RouterView } from "vue-router";
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

<template>
  <el-container>
    <el-header>
      <el-affix :offset="0">
        <el-menu :default-active="$route.path" mode="horizontal" router>
          <el-menu-item index="/HEXA">HEXA计算器</el-menu-item>
          <el-menu-item index="/ARC">岛球计算器</el-menu-item>
          <el-menu-item index="/SAC">原初球计算器</el-menu-item>
        </el-menu>
      </el-affix>
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
  ElAffix,
} from "element-plus";
import { RouterView } from "vue-router";
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

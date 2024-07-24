<template>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" router>
        <el-menu-item index="/HEXA" route="/HEXA">HEXA计算器</el-menu-item>
        <el-menu-item index="/Symbol" route="/Symbol">岛球计算器</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {
  ElMenu,
  ElMenuItem,
  ElContainer,
  ElHeader,
  ElMain,
} from "element-plus";
import {RouterView, useRouter} from "vue-router";

const activeIndex = ref("");

onMounted(() => {
  const router = useRouter();
  console.log(router.currentRoute.value);
  console.log(router.currentRoute.value.path);
  activeIndex.value = router.currentRoute.value.path;
});

</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

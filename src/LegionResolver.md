---
title: 联盟摆放助手
icon: rectangle-list
order: 4
contributors: false
lastUpdated: false
---

<iframe
  v-show="loaded"
  ref="iframeRef"
  :src="legionUrl"
  height="1024px"
  width="1445px"
  class="iframe"
/>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const legionUrl = import.meta.env.VITE_LEGION_URL;
const iframeRef = ref();
const loaded = ref(false);

onMounted(() => {
  iframeRef.value.onload = () => {
    loaded.value = true;
  };
});
</script>

<style scoped>
.iframe {
  margin: 0;
  border: none;
}
</style>
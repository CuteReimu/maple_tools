<template>
  <iframe :src="legionUrl" height="1024px" width="100%" class="iframe"></iframe>
</template>

<script setup lang="ts">
const legionUrl = import.meta.env.VITE_LEGION_URL;
</script>

<style scoped>
.iframe {
  margin: 0;
  border: none;
}
</style>
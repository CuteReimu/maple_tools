<template>
  <div class="move-select" ref="wrap">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { MoveEvent } from "@/types";

const wrap = ref<HTMLElement>();
let prevElement: EventTarget | null;

const emit = defineEmits<{
  (e: "startmove"): void;
  (e: "move", data: MoveEvent): void;
  (e: "stopmove"): void;
}>();

const onStartMove = (event: MouseEvent) => {
  const { target, clientX, clientY, offsetX, offsetY } = event;
  wrap.value!.addEventListener("mousemove", onMove);
  emit("startmove");
  emit("move", { element: target, clientX, clientY, offsetX, offsetY });
  prevElement = target;
};
const onMove = (event: MouseEvent) => {
  const { target, clientX, clientY, offsetX, offsetY } = event;
  if (prevElement === target) {
    return;
  } else {
    prevElement = target;
    emit("move", { element: target, clientX, clientY, offsetX, offsetY });
  }
};
const onStopMove = (event: MouseEvent) => {
  wrap.value!.removeEventListener("mousemove", onMove);
  emit("stopmove");
};

onMounted(() => {
  wrap.value!.addEventListener("mousedown", onStartMove);
  wrap.value!.addEventListener("mouseup", onStopMove);
});

onUnmounted(() => {
  wrap.value!.removeEventListener("mousedown", onStartMove);
  wrap.value!.removeEventListener("mouseup", onStopMove);
});
</script>

<style scoped></style>

<template>
  <el-form label-width="auto">
    <el-form-item label="原始文本：">
      <el-input v-model="originalText" style="width: 240px" />
    </el-form-item>
    <el-form-item label="转换结果：">
      <el-text>{{ convertedText }}</el-text>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {computed, ref} from 'vue';
import * as iconv from 'iconv-lite';
import {ElForm, ElFormItem, ElText, ElInput} from "element-plus";

const originalText = ref('');
const convertedText = computed(() => {
  try {
    // 将Unicode字符串转换为GB2312编码的Buffer
    const gb2312Buffer = iconv.encode(originalText.value, 'gb2312');

    // 将GB2312 Buffer转换为Latin1字符串
    // 使用 TextDecoder 的 latin1 编码来解码
    return new TextDecoder('latin1').decode(gb2312Buffer);
  } catch (error) {
    console.error('编码转换错误:', error);
    return '转换失败: ' + error.message;
  }
});
</script>
---
title: gms中文转换器
icon: language
order: 8
gitInclude:
  - ../.vuepress/components/UnicodeName.vue
---

<UnicodeName></UnicodeName>

<script setup>
import UnicodeName from "@UnicodeName";
</script>

## 使用教程

### 要求

自己电脑上有**英文输入法**，比如`Windows 英文（美国）`, **不能使用中文输入法的英文模式**

需要看到的人的系统语言为**简体中文**，如：`中文（中华人民共和国）`

### 方法

* 在上方文本框中输入所需文字，建议用空格隔开，如下

    ![example1.png](/images/unicodename/example1.png)

* 如果是聊天，基本可以随意输入中文；如果是起名，请确保所有字母都是英文字母的变体。如
  * `咕` 对应 `¹` + `¾`，不行
  * `兔` 对应 `Í` + `Ã`，可以，分别是 `I` 的变体和 `A` 的变体
  * `青` 对应 `Ç` + `à`，可以，分别是 `C` 的变体和 `a` 的变体
* 如果都是英文字母的变体，请确保字母组合内容不违反规定，否则有封号/改名风险
  * 如：`青兔`，就是 `ÇàÍÃ`，`CaIa`，没有奇怪的意思，可以
* 确认无误后，请**将输入法调至英文输入法**
* **一个一个的复制**结果中的符号，粘贴到游戏中；复制一个时会显示为`？`，复制一对时会显示为正确的汉字，如下
  * 请注意起名时最多12个字母，1个汉字等价2个字母

    ![example2.png](/images/unicodename/example2.png)
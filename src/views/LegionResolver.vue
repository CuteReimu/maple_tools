<template>
  <el-row justify="center">
    <el-col :span="7">
      <form>
        <div class="piece" v-for="piece in pieces">
          <el-text size="small">{{ piece.name }}</el-text>
          <table class="piece-table">
            <tbody>
              <tr v-for="row in piece.shape">
                <td
                  class="pieceCell"
                  v-for="col in row"
                  :style="{
                    'background-color': calColor(piece.id, col),
                  }"
                ></td>
              </tr>
            </tbody>
          </table>
          <el-input-number :min="0" size="small" v-model="piece.amount" />
        </div>
      </form>
      <el-button id="clearPieces" @click="clearPieces"
        >清除所有的拼图</el-button
      >
    </el-col>
    <el-col :span="10">
      <el-row justify="center">
        <table id="legionBoard">
          <tbody>
            <tr v-for="(row, y) in board">
              <td
                @click="setBoard(y, x)"
                class="legionCell"
                v-for="(col, x) in row"
                :style="{
                  'background-color': pieceColours.get(col),
                  'border-width':
                    calWidth(x, y, 1) +
                    'px ' +
                    calWidth(x, y, 2) +
                    'px ' +
                    calWidth(x, y, 3) +
                    'px ' +
                    calWidth(x, y, 4) +
                    'px',
                }"
              ></td>
            </tr>
          </tbody>
        </table>
      </el-row>
      <el-row justify="center" style="margin: 10px;">
        <el-col :span="10">
          <el-text>
            <div>可填入的区块数量：{{ currentPiecesCount }}</div>
            <div>可使用的区块数量：{{ boardFilledValue }}</div>
            <div>当前使用的角色数量：{{ currentCaracterCount }}</div>
          </el-text>
          <el-button id="clearBoard" @click="clearBoard"  style="margin-top: 10px;">清除面板</el-button>
        </el-col>
        <el-col :span="8">
          <el-button id="boardButton" @click="runSolver">开始</el-button>
          <el-button id="resetButton" @click="reset">重置</el-button>
          <div id="failText"></div>
        </el-col>
        <el-col :span="6">
          <el-checkbox
            label="按区块选取"
            v-model="isBigClick"
          />
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="7" style="padding-left: 30px;">
      <h2>使用方法：</h2>
      <el-text size="large" style="padding-right: 80px;">
        <p>1. 点击你想要使用的区块，或者可以使用“按区块选取”功能。</p>
        <p>2. 输入你拥有的角色拼图数量。</p>
        <p>
          3.
          必须要确定可使用的区块数量和可填入的区块数量相等，否则自动排列程序将陷入死循环。
        </p>
        <p>
          4.
          只要点击开始，程序就会自动按照你输入的拼图数量填满区块。你也可以打开实时演算功能来查看过程
        </p>
      </el-text>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  LegionSolver,
  iterationsStyleVisibility,
  iterationsValueInnerText,
  timeStyleVisibility,
  timeValueInnerText,
} from "@/utils/legion_solver";
import {
  currentPiecesCount,
  currentCaracterCount,
  pieceColours,
  pieces,
  clearPieces,
} from "@/utils/pieces";
import {
  boardFilledValue,
  isBigClick,
  clearBoard,
  reset,
  runSolver,
  board,
  setBoard,
} from "@/utils/board";
import {
  ElRow,
  ElCol,
  ElInputNumber,
  ElText,
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
} from "element-plus";

const calColor = (id: number, val: number) => {
  if (val > 0) return pieceColours.get(id);
  return pieceColours.get(-1);
};

const calWidth = (x: number, y: number, dir: number): number => {
  if (x == 0 && dir == 4) return 3;
  if (y == 0 && dir == 1) return 3;
  if ([10, 21].includes(x) && dir == 2) return 3;
  if ([9, 19].includes(y) && dir == 3) return 3;
  if (y == 21 && dir == 3) return 3;
  if (x < 10 && x == y && dir <= 2) return 3;
  if (x <= 10 && x + y == 20 && [1, 4].includes(dir)) return 3;
  if (x > 10 && x == y + 1 && dir <= 2) return 3;
  if (x > 10 && x + y == 21 && [1, 4].includes(dir)) return 3;
  if ([4, 16].includes(x) && y < 15 && y >= 5 && dir == 2) return 3;
  if ([4, 14].includes(y) && x <= 15 && x > 5 && dir == 3) return 3;
  return 1;
};
</script>

<style scoped>
#legionBoard {
  border-spacing: 0;
  border-collapse: collapse;
}

#legionBoard td.legionCell {
  width: 25px;
  height: 25px;
  border-style: solid;
  border-width: 1px;
}

td.pieceCell {
  width: 7px;
  height: 7px;
  border-style: solid;
  border-width: 0;
}

.piece {
  display: flex;
  flex-direction: row;
  margin-bottom: 7px;
  align-items: center;
  justify-content: flex-end;
}

.piece-table {
  border-collapse: collapse;
  border-spacing: 0;
  height: fit-content;
  width: fit-content;
  table-layout: fixed;
  margin-left: 7px;
  margin-right: 7px;
}
</style>

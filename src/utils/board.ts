import { Point } from "./point";
import { LegionSolver } from "./legion_solver";
import { pieces } from "./pieces";
import _ from "lodash";
import { type Reactive, reactive, ref } from "vue";

const board: Reactive<number[][]> = reactive(
  Array(20)
    .fill(0)
    .map(() => Array(22).fill(-1))
);
let legionSolvers: LegionSolver[] = [];

const states = {
  START: "start",
  RUNNING: "running",
  PAUSED: "paused",
  COMPLETED: "completed",
};
let state = states.START;

const legionGroups: Point[][] = [];
for (let i = 0; i < 16; i++) {
  legionGroups[i] = [];
}

setLegionGroups();
let boardFilled = 0;
const isBigClick = ref(false);
/*
let dragging = false;
let dragValue: number = 0;
for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[0].length; j++) {
    let grid = getLegionCell(i, j)

    grid.addEventListener("mousedown", () => {
      dragValue = board[i][j] == 0 ? -1 : 0;
      setBoard(i, j, dragValue);
      dragging = true;
    });
    grid.addEventListener("mouseover", () => {
      if (dragging) {
        setBoard(i, j, dragValue);
      } else {
        hoverOverBoard(i, j);
      }
    });
    grid.addEventListener("mouseout", () => {
      if (!dragging) {
        hoverOffBoard(i, j) ;
      }
    });
  }
}

//document.documentElement.addEventListener("mouseup", () => { dragging = false });
//document.getElementById("legion").addEventListener("dragstart", (evt) => evt.preventDefault());
*/
function setLegionGroups() {
  for (let i = 0; i < board.length / 4; i++) {
    for (let j = i; j < board.length / 2; j++) {
      legionGroups[0].push(new Point(j, i));
      legionGroups[1].push(new Point(i, j + 1));
      legionGroups[2].push(new Point(i, board[0].length - 2 - j));
      legionGroups[3].push(new Point(j, board[0].length - 1 - i));
      legionGroups[4].push(
        new Point(board.length - 1 - j, board[0].length - 1 - i)
      );
      legionGroups[5].push(
        new Point(board.length - 1 - i, board[0].length - 2 - j)
      );
      legionGroups[6].push(new Point(board.length - 1 - i, j + 1));
      legionGroups[7].push(new Point(board.length - 1 - j, i));
    }
  }
  for (let i = board.length / 4; i < board.length / 2; i++) {
    for (let j = i; j < board.length / 2; j++) {
      legionGroups[8].push(new Point(j, i));
      legionGroups[9].push(new Point(i, j + 1));
      legionGroups[10].push(
        new Point((3 * board.length) / 4 - 1 - j, board.length / 4 + 1 + i)
      );
      legionGroups[11].push(new Point(j, board[0].length - 1 - i));
      legionGroups[12].push(
        new Point(board.length - 1 - j, board[0].length - 1 - i)
      );
      legionGroups[13].push(
        new Point(j + board.length / 4, i + board.length / 4 + 1)
      );
      legionGroups[14].push(
        new Point(j + board.length / 4, (3 * board.length) / 4 - i)
      );
      legionGroups[15].push(new Point(board.length - j - 1, i));
    }
  }
}

function findGroupNumber(i: number, j: number) {
  for (let k = 0; k < legionGroups.length; k++) {
    for (let point of legionGroups[k]) {
      if (point.x == i && point.y == j) {
        return k;
      }
    }
  }
  return -1;
}

const boardFilledValue = ref("0");

const clearBoard = () => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = -1;
    }
  }
  boardFilled = 0;
  boardFilledValue.value = `${boardFilled}`;
};

const setBoard = (i: number, j: number) => {
  console.log("setBoard" + i + "," + j);
  if (state != states.START) {
    return;
  }
  let value = -1 - board[i][j];

  if (isBigClick.value) {
    if (value == 0) {
      for (let point of legionGroups[findGroupNumber(i, j)]) {
        if (board[point.x][point.y] == -1) {
          boardFilled++;
        }
        board[point.x][point.y] = 0;
      }
    } else {
      for (let point of legionGroups[findGroupNumber(i, j)]) {
        if (board[point.x][point.y] == 0) {
          boardFilled--;
        }
        board[point.x][point.y] = -1;
      }
    }
  } else {
    if (value == -1) {
      if (board[i][j] != -1) {
        board[i][j] = -1;
        boardFilled--;
      }
    } else {
      if (board[i][j] != 0) {
        board[i][j] = 0;
        boardFilled++;
      }
    }
  }
  boardFilledValue.value = `${boardFilled}`;
};

function resetBoard() {
  for (let k = 0; k < legionSolvers.length; k++) {
    for (let i = 0; i < legionSolvers[k].board.length; i++) {
      for (let j = 0; j < legionSolvers[k].board[0].length; j++) {
        if (k == 0) {
          if (legionSolvers[k].board[i][j] >= 0) {
            legionSolvers[k].board[i][j] = 0;
          }
        } else {
          if (legionSolvers[k].board[i][j] >= 0) {
            legionSolvers[k].board[i][j] = 0;
          }
        }
      }
    }
  }
  legionSolvers = [];
}

function reset() {
  resetBoard();
  state = states.START;
}

let currentPieces: number;

async function runSolver() {
  if (boardFilled == 0 && currentPieces > 0) {
    return false;
  }
  let downBoard: number[][] = [];
  for (let i = 0; i < board.length; i++) {
    downBoard[i] = [];
    for (let j = 0; j < board[0].length; j++) {
      downBoard[i][j] = board[board.length - 1 - i][board[0].length - 1 - j];
    }
  }
  let rightBoard: number[][] = [];
  for (let i = 0; i < board[0].length; i++) {
    rightBoard[i] = [];
    for (let j = 0; j < board.length; j++) {
      rightBoard[i][j] = board[board.length - j - 1][i];
    }
  }
  let leftBoard: number[][] = [];
  for (let i = 0; i < board[0].length; i++) {
    leftBoard[i] = [];
    for (let j = 0; j < board.length; j++) {
      leftBoard[i][j] = board[j][board[0].length - 1 - i];
    }
  }

  legionSolvers.push(new LegionSolver(board, _.cloneDeep(pieces), () => false));
  legionSolvers.push(
    new LegionSolver(rightBoard, _.cloneDeep(pieces), () => false)
  );
  legionSolvers.push(
    new LegionSolver(downBoard, _.cloneDeep(pieces), () => false)
  );
  legionSolvers.push(
    new LegionSolver(leftBoard, _.cloneDeep(pieces), () => false)
  );

  let runRotated = legionSolvers[0].longSpaces.length != 0;
  const boardPromise = legionSolvers[0].solve();
  let success;
  if (runRotated) {
    const rightBoardPromise = legionSolvers[1].solve();
    const downBoardPromise = legionSolvers[2].solve();
    const leftBoardPromise = legionSolvers[3].solve();
    success = await Promise.race([
      boardPromise,
      rightBoardPromise,
      downBoardPromise,
      leftBoardPromise,
    ]);
  } else {
    success = await boardPromise;
  }

  for (let solver of legionSolvers) {
    solver.stop();
  }

  if (legionSolvers[0].success !== undefined) {
    for (let i = 0; i < legionSolvers[0].board.length; i++) {
      for (let j = 0; j < legionSolvers[0].board[0].length; j++) {
        board[i][j] = legionSolvers[0].board[i][j];
      }
    }
  } else if (legionSolvers[1].success !== undefined) {
    for (let i = 0; i < legionSolvers[1].board[0].length; i++) {
      for (let j = 0; j < legionSolvers[1].board.length; j++) {
        board[i][j] =
          legionSolvers[1].board[j][legionSolvers[1].board[0].length - 1 - i];
      }
    }

    for (let piece of legionSolvers[1].history) {
      for (let point of piece) {
        let holder = point.y;
        point.y = legionSolvers[1].board[0].length - 1 - point.x;
        point.x = holder;
      }
    }
  } else if (legionSolvers[2].success !== undefined) {
    for (let i = 0; i < legionSolvers[2].board.length; i++) {
      for (let j = 0; j < legionSolvers[2].board[0].length; j++) {
        board[i][j] =
          legionSolvers[2].board[legionSolvers[2].board.length - 1 - i][
            legionSolvers[2].board[0].length - 1 - j
          ];
      }
    }

    for (let piece of legionSolvers[2].history) {
      for (let point of piece) {
        point.y = legionSolvers[2].board.length - 1 - point.y;
        point.x = legionSolvers[2].board[0].length - 1 - point.x;
      }
    }
  } else if (legionSolvers[3].success !== undefined) {
    for (let i = 0; i < legionSolvers[3].board[0].length; i++) {
      for (let j = 0; j < legionSolvers[3].board.length; j++) {
        board[i][j] =
          legionSolvers[3].board[legionSolvers[3].board.length - j - 1][i];
      }
    }

    for (let piece of legionSolvers[3].history) {
      for (let point of piece) {
        let holder = point.x;
        point.x = legionSolvers[3].board.length - 1 - point.y;
        point.y = holder;
      }
    }
  }
  return success;
}

export {
  boardFilledValue,
  isBigClick,
  clearBoard,
  reset,
  runSolver,
  board,
  setBoard,
};

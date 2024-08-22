import { Piece } from './piece.js';
import { sumBy } from 'lodash';
import {computed, onMounted, reactive, ref} from "vue";
import cn from './cn.js';

const defaultPieces = [
  // Lvl 60
  [
    [2]
  ],

  // Lvl 100
  [
    [2, 2]
  ],

  // Lvl 140 Warrior/Pirate
  [
    [1, 0],
    [2, 1]
  ],

  // Lvl 140 Mage/Thief/Archer
  [
    [1, 2, 1]
  ],

  // Lvl 200 Warrior
  [
    [2, 2],
    [2, 2]
  ],

  // Lvl 200 Archer
  [
    [1, 2, 2, 1]
  ],

  // Lvl 200 Thief/Lab
  [
    [1, 0, 0],
    [1, 2, 1]
  ],

  // Lvl 200 Mage
  [
    [0, 1, 0],
    [1, 2, 1]
  ],

  // Lvl 200 Pirate
  [
    [1, 2, 0],
    [0, 2, 1]
  ],

  // Lvl 250 Warrior
  [
    [1, 1, 2],
    [0, 1, 1]
  ],

  // Lvl 250 Archer
  [
    [1, 1, 2, 1, 1],
  ],

  // Lvl 250 Thief
  [
    [0, 0, 1],
    [1, 2, 1],
    [0, 0, 1]
  ],

  // Lvl 250 Mage
  [
    [0, 1, 0],
    [1, 2, 1],
    [0, 1, 0]
  ],

  // Lvl 250 Pirate
  [
    [1, 2, 0, 0],
    [0, 1, 1, 1]
  ],

  // Lvl 250 Xenon
  [
    [1, 1, 0],
    [0, 2, 0],
    [0, 1, 1]
  ],

  // Abyssal Expedition
  [
    [1, 0, 0],
    [1, 2, 0],
    [0, 1, 1]
  ],

  // Lvl 200 Enhanced Lab
  [
    [1, 0, 0, 0],
    [0, 1, 2, 1]
  ],

  // Lvl 250 Enhanced Lab
  [
    [1, 0, 0, 0, 1],
    [0, 1, 2, 1, 0]
  ],

  // Lvl 250 Lab
  [
    [1, 0, 1],
    [1, 2, 1]
  ],
];

const piecesName = [
  cn.lvl60,
  cn.lvl100,
  cn.warriorPirate140,
  cn.mageThiefArcher140,
  cn.warrior200,
  cn.archer200,
  cn.thiefLab200,
  cn.mage200,
  cn.pirate200,
  cn.warrior250,
  cn.archer250,
  cn.thief250,
  cn.mage250,
  cn.pirate250,
  cn.xenon250,
  cn.abyssalExpedition,
  cn.enhancedLab200,
  cn.enhancedLab250,
  cn.lab250,
]

const currentPiecesCount = computed(() =>
  sumBy(pieces, piece => piece.cellCount * piece.amount)
);
const currentCaracterCount = computed(() =>
  sumBy(pieces, (piece) => piece.amount)
);
const piecesValue = ref<number[]>([]);

const pieces = reactive<Piece[]>([])
for (let i = 0; i < defaultPieces.length; i++){
  const piece = defaultPieces[i];
  pieces.push(Piece.createPiece(piece, 0, piecesName[i]));
}

console.log(pieces);

const pieceColours = new Map();
pieceColours.set(-1, 'white');
pieceColours.set(0, 'grey');
for (let i = 0; i < 2; i++) {
  pieceColours.set(1 + i * 19, 'lightpink');
  pieceColours.set(2 + i * 19, 'lightcoral');
  pieceColours.set(3 + i * 19, 'indianred');
  pieceColours.set(4 + i * 19, 'darkseagreen');
  pieceColours.set(5 + i * 19, 'firebrick');
  pieceColours.set(6 + i * 19, 'mediumseagreen');
  pieceColours.set(7 + i * 19, 'purple');
  pieceColours.set(8 + i * 19, 'dodgerblue');
  pieceColours.set(9 + i * 19, 'lightsteelblue');
  pieceColours.set(10 + i * 19, 'maroon');
  pieceColours.set(11 + i * 19, 'green');
  pieceColours.set(12 + i * 19, 'indigo');
  pieceColours.set(13 + i * 19, 'blue');
  pieceColours.set(14 + i * 19, 'cadetblue');
  pieceColours.set(15 + i * 19, 'mediumpurple');
  pieceColours.set(16 + i * 19, 'green');
  pieceColours.set(17 + i * 19, 'aquamarine');
  pieceColours.set(18 + i * 19, 'aquamarine');
  pieceColours.set(19 + i * 19, 'aquamarine');
}

let currentPieces = 0;
let currentUseCaracterCount = 0;
if (localStorage.getItem("currentPieces")) {
  currentPieces = JSON.parse(localStorage.getItem("currentPieces")!);
}

let pieceAmounts: number[] = [];
if (localStorage.getItem("pieceAmounts")) {
  pieceAmounts = JSON.parse(localStorage.getItem("pieceAmounts")!);
  for (let i = 0; i < pieces.length; i++) {
    piecesValue.value[i+1] = pieceAmounts[i] || 0;
  }
}

function clearPieces() {
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].amount = 0
  }
}

export { currentPiecesCount, currentCaracterCount, pieceColours, pieces, clearPieces };
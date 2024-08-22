import { Point } from './point.js';
import _ from 'lodash';

class Piece {
  static curId = 1;

  shape: number[][];
  amount: number;
  id: number;
  name: string;

  constructor(shape: number[][], amount: number, id: number, name: string) {
    this.shape = shape;
    this.amount = amount;
    this.id = id;
    this.name = name
  }

  static createPiece(shape: number[][], amount: number, name: string): Piece {
    return new Piece(shape, amount, this.curId++, name);
  }

  get cellCount(): number {
    let cellCount = 0;
    for (let i = 0; i < this.shape.length; ++i) {
      for (let j = 0; j < this.shape[i].length; ++j) {
        if (this.shape[i][j] > 0) {
          cellCount++;
        }
      }
    }
    return cellCount;
  }

  get pointShape(): PiecePoint[] {
    let pointShape: PiecePoint[] = [];
    for (let i = 0; i < this.shape.length; ++i) {
      for (let j = 0; j < this.shape[i].length; ++j) {
        if (this.shape[i][j] == 1) {
          pointShape.push(new PiecePoint(j, i, false));
        } else if (this.shape[i][j] == 2) {
          pointShape.push(new PiecePoint(j, i, true));
        }
      }
    }
    return pointShape;
  }

  get offCenter(): number {
    let offCenter = 0;
    for (let i = 0; i < this.shape[0].length; i++) {
      if (this.shape[0][i] != 0) {
        offCenter = i;
        break;
      }
    }
    return offCenter;
  }


  get transformations(): Piece[] {
    let transformations: Piece[] = [];
    let shape = [...this.shape];
    let newGrid;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        newGrid = new Array(shape[0].length).fill(0).map(() => new Array(shape.length).fill(0));
        for (let k = 0; k < shape.length; k++) {
          for (let l = 0; l < shape[0].length; l++) {
            if (shape[k][l] != 0) {
              newGrid[shape[0].length-l-1][k] = shape[k][l];
            }
          }
        }
        shape = newGrid;
        transformations.push(new Piece(shape, this.amount, this.id, this.name));
      }
      newGrid = new Array(shape.length).fill(0).map(() => new Array(shape[0].length).fill(0));
      for (let k = 0; k < shape.length; k++) {
        for (let l = 0; l < shape[0].length; l++) {
          if (shape[k][l] != 0) {
            newGrid[shape.length-k-1][l] = shape[k][l];
          }
        }
      }
      shape = newGrid;
    }

    transformations = _.unionWith(transformations, _.isEqual);
    return transformations;
  }

  get pointTransformations(): PiecePoint[][] {
    let pointTransformations: PiecePoint[][] = [];
    for (let piece of this.transformations) {
      pointTransformations.push(piece.pointShape);
    }

    return pointTransformations;
  }

  get restrictedTransformations(): Piece[] {
    let restrictedTransformations: Piece[] = [];
    for (let piece of this.transformations) {
      if (!piece.shape[0][1 + piece.offCenter] || piece.shape[0][1 + piece.offCenter] == 0) {
        restrictedTransformations.push(piece);
      }
    }
    return restrictedTransformations;
  }

  get restrictedPointTransformations(): PiecePoint[][] {
    let restrictedPointTransformations: PiecePoint[][] = [];
    for (let piece of this.restrictedTransformations) {
      restrictedPointTransformations.push(piece.pointShape);
    }
    return restrictedPointTransformations;
  }
}

class PiecePoint extends Point {
  isMiddle: boolean
  constructor(x: number, y: number, isMiddle: boolean) {
    super(x, y);
    this.isMiddle = isMiddle;
  }
}

export { Piece, PiecePoint };
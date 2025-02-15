import { BOARD_SIZE, ROW_SIZE } from "../common/constants.ts";

export class Game {
  private _board;
  private _isGameOver = false;

  constructor(board?: Board) {
    this._board = board ?? [];
  }

  get board() {
    return this._board;
  }

  playTurn(move: Move) {
    if (this.allRulesCheck(move)) {
      this._board[move.position] = move.symbol;
    }

    if (this.gameOverCheck()) {
      this._isGameOver = true;
    }
  }

  getNextTurnSymbol(): Symbol {
    const xCount = this.countSymbols("X");
    const oCount = this.countSymbols("O");

    return (xCount > oCount) ? "O" : "X";
  }

  private countSymbols(symbol: Symbol): number {
    return this._board.filter((s) => s === symbol).length;
  }

  private allRulesCheck(move: Move) {
    // seat is taken?
    if (this._board[move.position] !== undefined) {
      return false;
    }

    // Is the right symbols turn?
    if (this.getNextTurnSymbol() !== move.symbol) {
      return false;
    }

    // position is withing the board?
    if (move.position > BOARD_SIZE - 1) {
      return false;
    }

    return true;
  }

  gameOverCheck() {
    /* const hasRow = false;
    const hasDiagonal = false; */

    if (this.hasColumn() || !this.hasFreeSeats()) {
      this._isGameOver = true;
    }

    return this._isGameOver;
  }

  private hasColumn() {
    let i = 0;
    let match = false;

    while (!match && i < ROW_SIZE) {
      match = this._board[i] !== undefined &&
        this._board[i] === this._board[i + ROW_SIZE] &&
        this._board[i + ROW_SIZE] === this._board[i + ROW_SIZE * 2];
      i++;
    }

    return match;
  }

  private hasFreeSeats() {
    return this._board.length < BOARD_SIZE;
  }
}

export class Move {
  position: number;
  symbol: Symbol;

  constructor(position: number, symbol: Symbol) {
    this.position = position;
    this.symbol = symbol;
  }
}

export type Symbol = "X" | "O";

type Board = Array<Symbol>;

import { BOARD_SIZE, ROW_SIZE } from "../common/constants.ts";
import { Board, Move, Symbol } from "../types/index.ts";

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
    if (this.hasRow() || this.hasColumn() || !this.hasFreeSeats()) {
      this._isGameOver = true;
    }

    return this._isGameOver;
  }

  /*
   * Returns true when it finds a column filled with one symbol
   */
  private hasColumn() {
    let col = 0;
    let match = false;

    while (!match && col < ROW_SIZE) {
      const first = this._board[col];
      const second = this._board[col + ROW_SIZE];
      const third = this._board[col + ROW_SIZE * 2];

      match = first !== undefined &&
        first === second &&
        second === third;

      col++;
    }

    return match;
  }

  /*
   * Returns true when it finds a row filled with one symbol
   */
  private hasRow() {
    let row = 0;
    let match = false;

    while (!match && row < BOARD_SIZE) {
      const firstSeat = this._board[row];
      const secondSeat = this._board[row + 1];
      const thirdSeat = this._board[row + 2];

      match = firstSeat !== undefined &&
        firstSeat === secondSeat &&
        secondSeat === thirdSeat;

      row += ROW_SIZE;
    }

    return match;
  }

  private hasFreeSeats() {
    return this._board.length < BOARD_SIZE;
  }
}

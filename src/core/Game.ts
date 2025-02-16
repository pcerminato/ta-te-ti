import { BOARD_SIZE, ROW_SIZE } from "../common/constants.ts";
import { Board, Move, Symbol } from "../types/index.ts";

export class Game {
  private _board;
  private _isGameOver = false;

  constructor(board?: Board) {
    if (board && board.length > BOARD_SIZE) {
      throw new Error(
        `Board size initializer is ${board.length} long. Maximun size allowed is ${BOARD_SIZE}.`,
      );
    }
    this._board = board ?? new Array(BOARD_SIZE);
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

  playMovesSet(movesSet: Move[]) {
    movesSet.forEach((move) => {
      this.playTurn(move);
    });
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
      throw new Error(
        `Cannot insert becase the seat is taken alredy`,
      );
    }

    // Is the right symbols turn?
    const nextTurnSymbol = this.getNextTurnSymbol();

    if (nextTurnSymbol !== move.symbol) {
      throw new Error(
        `Cannot insert becase it is the turn for ${nextTurnSymbol} symbol, not ${move.symbol}`,
      );
    }

    // position is withing the board?
    if (move.position > BOARD_SIZE - 1) {
      throw new Error(
        `Cannot insert into position ${move.position} because it is off the board. Highest position is ${
          BOARD_SIZE - 1
        }`,
      );
    }

    return true;
  }

  gameOverCheck() {
    if (this._isGameOver) {
      return true;
    }

    this._isGameOver = this.hasDiagonal() ||
      this.hasRow() ||
      this.hasColumn() ||
      !this.hasFreeSeats();

    return this._isGameOver;
  }

  /*
   * Returns true when it finds a column filled with one symbol
   */
  private hasColumn() {
    let col = 0;
    let match = false;

    while (!match && col < ROW_SIZE) {
      match = this.seatsAreAllEq([col, col + ROW_SIZE, col + ROW_SIZE * 2]);
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
      match = this.seatsAreAllEq([row, row + 1, row + 2]);
      row += ROW_SIZE;
    }

    return match;
  }

  hasDiagonal() {
    // left-to-right diagonal OR right-to-left
    return this.seatsAreAllEq([0, 4, 8]) || this.seatsAreAllEq([2, 4, 6]);
  }

  private hasFreeSeats() {
    return this._board.includes(undefined);
  }

  /* Utility to find consecutive equal symbols */
  private seatsAreAllEq(positions: number[]) {
    const firstSeat = this._board[positions[0]];
    const secondSeat = this._board[positions[1]];
    const thirdSeat = this._board[positions[2]];

    return firstSeat !== undefined &&
      firstSeat === secondSeat &&
      secondSeat === thirdSeat;
  }
}

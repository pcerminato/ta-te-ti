import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";

import { Game } from "../src/core/Game.ts";
import { Board, Symbol } from "../src/types/index.ts";
import { BOARD_SIZE } from "../src/common/constants.ts";
import {
  diagonalXFull,
  firstColXFull,
  firstRowOFull,
  secondColXFull,
  secondRowOFull,
  thirdColXFull,
  thirdRowOFull,
} from "../src/data/moves-sets.ts";

describe("Symbol insertion", () => {
  it("Should inserts X symbol in position 0", () => {
    const position = 0;
    const symbol: Symbol = "X";
    const move = { position, symbol };
    const game = new Game();

    game.playTurn(move);

    expect(game.board[position]).toEqual(symbol);
  });
});

describe("Board boundaries", () => {
  it("should throw an error when the board is longer that allowed", () => {
    const longerBoard: Board = new Array(BOARD_SIZE + 1);

    expect(() => new Game(longerBoard)).toThrow(
      new Error(
        `Board size initializer is ${longerBoard.length} long. Maximun size allowed is ${BOARD_SIZE}.`,
      ),
    );
  });

  it("Won't allow inserting a symbol in position that is taken", () => {
    const position = 0;
    const symbol: Symbol = "X";
    const game = new Game();

    game.playTurn({ position, symbol });

    expect(() => game.playTurn({ position, symbol: "O" })).toThrow();

    expect(game.board[position]).toEqual(symbol);
  });

  it("Won't allow inserting a symbol off the board", () => {
    const wrongPosition = BOARD_SIZE + 1;
    const game = new Game();

    expect(() => game.playTurn({ position: wrongPosition, symbol: "X" }))
      .toThrow();
  });
});

describe("Turns evaluation", () => {
  it("Should not allow inserting a symbol for the wrong turn", () => {
    const position = 0;
    const positionNext = 1;
    const symbol: Symbol = "X";
    const game = new Game();

    game.playTurn({ position, symbol });

    expect(() => game.playTurn({ position: positionNext, symbol })).toThrow();
  });

  it("Next symbol should be X", () => {
    const game = new Game();

    expect(game.getNextTurnSymbol()).toEqual("X");

    game.playTurn({ position: 0, symbol: "X" });
    game.playTurn({ position: 1, symbol: "O" });

    expect(game.getNextTurnSymbol()).toEqual("X");
  });

  it("Next symbol should be O", () => {
    const game = new Game();

    expect(game.getNextTurnSymbol()).toEqual("X");

    game.playTurn({ position: 0, symbol: "X" });

    expect(game.getNextTurnSymbol()).toEqual("O");
  });
});

describe("Game over", () => {
  it("Game is over when there are no seats left", () => {
    const game = new Game();

    expect(game.gameOverCheck()).toBe(false);

    for (let i = 0; i < BOARD_SIZE; i++) {
      const symbol = (i % 2) ? "O" : "X";
      game.playTurn({ position: i, symbol });
    }

    expect(game.gameOverCheck()).toBe(true);
  });

  describe("Game is over when there there's a full column with one symbol", () => {
    const allPosibleColMoves = [firstColXFull, secondColXFull, thirdColXFull];

    allPosibleColMoves.forEach((currentMovesSet, i) => {
      it(`should game over when the #${i + 1} column is full with X`, () => {
        const game = new Game();

        expect(game.gameOverCheck()).toBe(false);

        game.playMovesSet(currentMovesSet);

        expect(game.gameOverCheck()).toBe(true);
      });
    });
  });

  describe("Game is over when there there's a full column with one symbol", () => {
    const allPosibleRowMoves = [
      firstRowOFull,
      secondRowOFull,
      thirdRowOFull,
    ];

    allPosibleRowMoves.forEach((currentMovesSet, i) => {
      it(`should game over when the #${i + 1} row is full with O`, () => {
        const game = new Game();

        expect(game.gameOverCheck()).toBe(false);

        game.playMovesSet(currentMovesSet);

        expect(game.gameOverCheck()).toBe(true);
      });
    });
  });

  it("Game is over when there is a diagonal filled with the same symbol", () => {
    const game = new Game();

    expect(game.gameOverCheck()).toBe(false);

    game.playMovesSet(diagonalXFull);

    expect(game.gameOverCheck()).toBe(false);
  });
});

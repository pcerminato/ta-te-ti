import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { Game, Move, Symbol } from "../src/core/Game.ts";
import { BOARD_SIZE } from "../src/common/constants.ts";

describe("Symbol insertion", () => {
  it("Should inserts X symbol in position 0", () => {
    const position = 0;
    const symbol: Symbol = "X";
    const move = new Move(position, symbol);
    const game = new Game();

    game.playTurn(move);

    expect(game.board[position]).toEqual(symbol);
  });
});

describe("Board boundaries", () => {
  it("Won't allow inserting a symbol in position that is taken", () => {
    const position = 0;
    const symbol: Symbol = "X";
    const game = new Game();

    game.playTurn(new Move(position, symbol));
    game.playTurn(new Move(position, "O"));

    expect(game.board[position]).toEqual(symbol);
  });

  it("Won't allow inserting a symbol off the board", () => {
    const wrongPosition = BOARD_SIZE + 1;
    const game = new Game();

    game.playTurn(new Move(wrongPosition, "X"));

    expect(game.board).toHaveLength(0);
  });
});

describe("Turns evaluation", () => {
  it("Should not allow inserting a symbol for the wrong turn", () => {
    const position = 0;
    const positionNext = 1;
    const symbol: Symbol = "X";
    const game = new Game();

    game.playTurn(new Move(position, symbol));
    game.playTurn(new Move(positionNext, symbol));

    expect(game.board).toHaveLength(1);
  });

  it("Next symbol should be X", () => {
    const game = new Game();

    expect(game.getNextTurnSymbol()).toEqual("X");

    game.playTurn(new Move(0, "X"));
    game.playTurn(new Move(1, "O"));

    expect(game.getNextTurnSymbol()).toEqual("X");
  });

  it("Next symbol should be O", () => {
    const game = new Game();

    expect(game.getNextTurnSymbol()).toEqual("X");

    game.playTurn(new Move(0, "X"));

    expect(game.getNextTurnSymbol()).toEqual("O");
  });
});

describe("Game over", () => {
  it("Game is over when there are no seats left", () => {
    const game = new Game();

    expect(game.gameOverCheck()).toBe(false);

    for (let i = 0; i < BOARD_SIZE; i++) {
      game.playTurn(new Move(i, (i % 2) ? "O" : "X"));
    }

    expect(game.gameOverCheck()).toBe(true);
  });

  it("Game is over when there there's a full column with with X", () => {
    const game = new Game();

    expect(game.gameOverCheck()).toBe(false);

    for (let i = 0; i < BOARD_SIZE; i++) {
      game.playTurn(new Move(i, (i % 2) ? "O" : "X"));
    }

    expect(game.gameOverCheck()).toBe(true);
  });
});

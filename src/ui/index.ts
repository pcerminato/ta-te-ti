import { Game } from "../core/Game.ts";
import { Board, Move } from "../types/index.ts";

const UNKNOWN_ERR = "Unknown error";

export function gameStart() {
  const game = new Game();
  const boardView = document.querySelector("div.board");
  const handleBoardClick = boardClickEventHandler(game);

  boardView?.addEventListener("click", handleBoardClick);

  return game;
}

function logGameState(stateMessage: string) {
  const gameStateView = document.querySelector("div.game-state");

  gameStateView!.innerHTML = stateMessage;
}

function drawSymbols(board: Board) {
  board.forEach((symbol, position) => {
    const seat = document.querySelector(`div[data-seat-index='${position}'`);

    seat!.innerHTML = symbol;
  });
}

function boardClickEventHandler(game: Game) {
  return function handleBoardClick(event: Event) {
    const { target } = event;
    const { seatIndex } = (target as HTMLDivElement).dataset;

    const symbol = game.getNextTurnSymbol();
    const position = parseInt(seatIndex || "0");
    const move: Move = {
      position,
      symbol,
    };

    try {
      game.playTurn(move);

      drawSymbols(game.board);

      if (game.gameOverCheck()) {
        // here event.currentTarget = this, but currentTarget is more convenient to type
        (event.currentTarget as HTMLDivElement).removeEventListener(
          "click",
          handleBoardClick,
        );
        logGameState("Game over");
      } else {
        const nextTurnSymbol = game.getNextTurnSymbol();
        logGameState(`Is ${nextTurnSymbol}'s turn`);
      }
    } catch (error) {
      const message = (error as Error)?.message || UNKNOWN_ERR;
      logGameState(message);
    }
  };
}

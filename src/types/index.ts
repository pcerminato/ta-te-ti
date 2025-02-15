export type Move = {
  position: number;
  symbol: Symbol;
};

export type Symbol = "X" | "O";

export type Board = Array<Symbol>;

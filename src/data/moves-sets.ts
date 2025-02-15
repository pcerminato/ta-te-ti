import { Move } from "../types/index.ts";

/*
| X | O |   |
| X | O |   |
| X |   |   |
*/
export const firstColXFull: Move[] = [{
  position: 0,
  symbol: "X",
}, {
  position: 4,
  symbol: "O",
}, {
  position: 3,
  symbol: "X",
}, {
  position: 1,
  symbol: "O",
}, {
  position: 6,
  symbol: "X",
}];

/*
| O | X | O |
|   | X |   |
|   | X |   |
*/
export const secondColXFull: Move[] = [{
  position: 4,
  symbol: "X",
}, {
  position: 0,
  symbol: "O",
}, {
  position: 1,
  symbol: "X",
}, {
  position: 2,
  symbol: "O",
}, {
  position: 7,
  symbol: "X",
}];

/*
|   |   | X |
|   | O | X |
|   | O | X |
*/
export const thirdColXFull: Move[] = [{
  position: 2,
  symbol: "X",
}, {
  position: 4,
  symbol: "O",
}, {
  position: 5,
  symbol: "X",
}, {
  position: 7,
  symbol: "O",
}, {
  position: 8,
  symbol: "X",
}];

/*
| O | O | O |
| X |   |   |
| X | X |   |
*/
export const firstRowOFull: Move[] = [{
  position: 3,
  symbol: "X",
}, {
  position: 0,
  symbol: "O",
}, {
  position: 7,
  symbol: "X",
}, {
  position: 1,
  symbol: "O",
}, {
  position: 6,
  symbol: "X",
}, {
  position: 2,
  symbol: "O",
}];

/*
| X |   |   |
| O | O | O |
| X | X |   |
*/
export const secondRowOFull: Move[] = [{
  position: 0,
  symbol: "X",
}, {
  position: 3,
  symbol: "O",
}, {
  position: 7,
  symbol: "X",
}, {
  position: 4,
  symbol: "O",
}, {
  position: 6,
  symbol: "X",
}, {
  position: 5,
  symbol: "O",
}];

/*
| X |   | X |
| X |   |   |
| O | O | O |
*/
export const thirdRowOFull: Move[] = [{
  position: 0,
  symbol: "X",
}, {
  position: 6,
  symbol: "O",
}, {
  position: 3,
  symbol: "X",
}, {
  position: 7,
  symbol: "O",
}, {
  position: 2,
  symbol: "X",
}, {
  position: 8,
  symbol: "O",
}];

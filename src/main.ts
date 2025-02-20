import "./style.css";
import { gameStart } from "./ui/index.ts";

// @ts-expect-error
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="board">
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
  </div>
`;

console.log(gameStart());

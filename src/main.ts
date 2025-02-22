import "./style.css";
import { gameStart } from "./ui/index.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="board">
    <div class="seat" data-seat-index="0"></div>
    <div class="seat" data-seat-index="1"></div>
    <div class="seat" data-seat-index="2"></div>
    <div class="seat" data-seat-index="3"></div>
    <div class="seat" data-seat-index="4"></div>
    <div class="seat" data-seat-index="5"></div>
    <div class="seat" data-seat-index="6"></div>
    <div class="seat" data-seat-index="7"></div>
    <div class="seat" data-seat-index="8"></div>
  </div>
`;

console.log(gameStart());

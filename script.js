let box = document.querySelectorAll(".XorO");
let reset_Button = document.querySelector("#reset_button");
let new_Game_Button = document.querySelector("#new_button");
let msg_container = document.querySelector(".massage_container");
let msg = document.querySelector("#massage");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msg_container.classList.add("hide");
};

box.forEach((XorO) => {
    XorO.addEventListener("click", () => {
    if (turnO) {
      //playerO
      XorO.innerText = "O";
      turnO = false;
    } else {
      //playerX
      XorO.innerText = "X";
      turnO = true;
    }
    XorO.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msg_container.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let XorO of box) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let XorO of box) {
    XorO.disabled = false;
    XorO.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msg_container.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = box[pattern[0]].innerText;
    let pos2Val = box[pattern[1]].innerText;
    let pos3Val = box[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

new_Game_Button.addEventListener("click", resetGame);
reset_Button.addEventListener("click", resetGame);
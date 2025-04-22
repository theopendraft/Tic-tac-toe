let cells = document.querySelectorAll('.cell');
let resetBtn = document.querySelector('#reset-button');
let newGameBtn = document.querySelector('#new-game');
let resetMain = document.querySelector('#reset-button-main');
let msgcontainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let resetScoreBtn = document.querySelector('#reset-scoreboard');
let currentPlayerSpan = document.getElementById("current-player");


let turn0 = true; // Player 1's turn

//scoreboard

let player1Score = 0;
let player2Score = 0;
let drawScore = 0;


const winningCombinations = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

const resetGame = () => {                       
    turn0 = true;
    enablecells();
    msgcontainer.classList.add("hide");
    resetMain.classList.remove("hidden");
    currentPlayerSpan.innerText = "X";
}

const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const drawSound = document.getElementById("draw-sound");

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
        cell.innerText = "X";
        if (turn0) {
            cell.innerText = "X";
            cell.classList.add("x");
            turn0 = false;
            document.getElementById("current-player").innerText = "O";
        } else {
            cell.innerText = "O";
            cell.classList.add("o");
            turn0 = true;
            document.getElementById("current-player").innerText = "X";
        }
        // turn0 = !turn0;
        cell.disabled = true;
        checkWinner();
    });
});

const disablecells = () => {
    for (let cell of cells) {
        cell.disabled = true;
    }
    }

const enablecells = () => {
        for (let cell of cells) {
            cell.disabled = false;
            cell.innerText = "";
            cell.style.backgroundColor = "";
            cell.classList.remove("x", "o");    
        }
    }

const showWinner = (winner) => {
    confetti();
    msg.innerText = "Winner is " + winner;
    msgcontainer.classList.remove("hide");
    resetMain.classList.add("hidden");
    disablecells();
    updateScoreboard(winner);
    if (winner === "X") {
        msg.innerText = "Player 1 wins!";
        winSound.play();
    } else if (winner === "O") {
        msg.innerText = "Player 2 wins!";
        winSound.play();
    } else {
        msg.innerText = "It's a draw!";
        winSound.play();
    }
    updateScoreboard(winner);
}

const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winningCombinations) {
         let pos1val = cells[pattern[0]].innerText;
         let pos2val = cells[pattern[1]].innerText;
         let pos3val = cells[pattern[2]].innerText;
        
            if (pos1val !== "" && pos1val === pos2val && pos1val === pos3val) {
                
                cells[pattern[0]].style.backgroundColor = "lightgreen";
                cells[pattern[1]].style.backgroundColor = "lightgreen";
                cells[pattern[2]].style.backgroundColor = "lightgreen";
                console.log("Winner is " + pos1val);
                showWinner(pos1val);
                winnerFound = true;
                
                return;
            }
        } 
            if (!winnerFound && Array.from(cells).every(cell => cell.innerText !== "")) {
                    showWinner("draw");
                }
 };
            
    

    const updateScoreboard = (winner) => {
        if (winner === "X") {
            player1Score++;
        } else if (winner === "O") {
            player2Score++;
        } else {
            drawScore++;
        }
    
        document.getElementById("player1-score").innerText = player1Score;
        document.getElementById("player2-score").innerText = player2Score;
        document.getElementById("draw-score").innerText = drawScore;
    };

    const resetScoreboard = () => {
        player1Score = 0;
        player2Score = 0;
        drawScore = 0;
    
        document.getElementById("player1-score").innerText = player1Score;
        document.getElementById("player2-score").innerText = player2Score;
        document.getElementById("draw-score").innerText = drawScore;
    }



newGameBtn.addEventListener("click", resetGame);
// resetBtn.addEventListener("click", resetGame);
resetMain.addEventListener("click", resetGame);
resetScoreBtn.addEventListener("click", resetScoreboard);
resetScoreBtn.addEventListener("click", resetGame);

resetGame(); // Initialize the game on page load


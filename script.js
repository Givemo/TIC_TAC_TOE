const cellElements = document.querySelectorAll('.cell');
const container = document.getElementById('container');
const xClass = 'x';
const oClass = 'o';
let oTurn;
const winningMessageTxt = document.getElementById('winning-text')
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        //Clear Board
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    });

    //Set hover effect
    setHover()

    // Remove winning message
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? oClass : xClass;
    //Place the mark
    placeMark(cell, currentClass);

    //Check for win
    if(checkWin(currentClass)) {
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        //Switch turns
        switchTurns()

         //Set hover effect
        setHover()
}
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurns() {
    oTurn = !oTurn
}

function setHover() {
    container.classList.remove(xClass);
    container.classList.remove(oClass);
    if(oTurn) {
        container.classList.add(oClass)
    } else {
        container.classList.add(xClass)
        
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        });
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageTxt.innerText = "Draw!"
    } else {
        winningMessageTxt.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}
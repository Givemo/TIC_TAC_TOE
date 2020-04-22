
const cellElements = document.querySelectorAll('.cell');
const container = document.getElementById('container');
const xClass = 'x';
const oClass = 'o';
let oTurn;
const winningMessageTxt = document.getElementById('winning-text')
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
const startButton = document.getElementById('start-button');
const newGame = document.getElementById('new-game');
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


restartButton.addEventListener('click', startGame);
startButton.addEventListener('click', makeStartBtnDisappear);

function makeStartBtnDisappear() {
    startButton.style.display = 'none';
}


function startGame() {
    oTurn = false;

    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(oClass);
        cell.removeEventListener('click', handleClick);
        winningMessageElement.classList.remove('show');
        cell.addEventListener('click', handleClick, {once: true});
    });

    //Set hover effect
    setHover()

    //Player names
    namePlayers();

    //Add new game button
        newGame.classList.add('new-game-add')
}

function namePlayers() {
    let playerOne = document.getElementById('input-player1');
    let playerTwo = document.getElementById('input-player2');
    if(playerOne.value === '' || playerTwo.value === '') {
        playerOne = 'X';
        playerTwo = 'O';
        document.getElementById('input-player1').placeholder = playerOne;
        document.getElementById('input-player2').placeholder = playerTwo; 
    } else {
        playerOne = playerOne.value;
        playerTwo = playerTwo.value;
        document.querySelectorAll('.input-player').forEach((e) => {
            e.placeholder = this.value;
        });
        
    }
}


/* This function will create an AI computer player when finished */
/*  function comp() {
    /* let i =   Math.floor(Math.random() * 9).toString();
    let first = document.getElementById(i)
    let currentClass = oTurn ? oClass : oClass;
    if(first.classList.before('2') && first.classList != xClass && first.classList != oClass) {
        first.classList.add(currentClass)
        console.log('contains')
    } else {
        comp();
        let currentClass = oTurn ? oClass : xClass;
    let first = document.getElementById('0');
    let second = document.getElementById('1');
    let third = document.getElementById('2');
    let forth = document.getElementById('3');
    let fifth = document.getElementById('4');
    let sixth = document.getElementById('5');
    let seventh = document.getElementById('6');
    let eigth = document.getElementById('7');
    let ninth = document.getElementById('8');
    setTimeout(function() {
    
    if(first.classList.contains('cell') && fifth.className === 'cell') {
        fifth.classList.add(oClass)
    }
    if(first.classList.contains(xClass) && forth.classList.contains(xClass)) {
        seventh.classList.add(oClass)
    }

    if(first.classList.contains(xClass) && second.classList.contains(xClass)) {
        third.classList.add(oClass)
    }

    if(third.classList.contains(xClass) && second.classList.contains(xClass)) {
        first.classList.add(oClass)
    }

    if(third.classList.contains(xClass) && sixth.classList.contains(xClass)) {
        ninth.classList.add(oClass)
    }

    if(ninth.classList.contains(xClass) && sixth.classList.contains(xClass)) {
        third.classList.add(oClass)
    }

    if(ninth.classList.contains(xClass) && eigth.classList.contains(xClass)) {
        seventh.classList.add(oClass)
    }

    if(seventh.classList.contains(xClass) && eigth.classList.contains(xClass)) {
        ninth.classList.add(oClass)
    }

    if(first.classList.contains(xClass) && third.classList.contains(xClass)) {
        second.classList.add(oClass)
    }

    if(first.classList.contains(xClass) && seventh.classList.contains(xClass)) {
        forth.classList.add(oClass)
    }

    if(third.classList.contains(xClass) && ninth.classList.contains(xClass)) {
        sixth.classList.add(oClass)
    }

    if(ninth.classList.contains(xClass) && seventh.classList.contains(xClass)) {
        eigth.classList.add(oClass)
    }


    if(seventh.classList.contains(xClass) && forth.classList.contains(xClass)) {
        first.classList.add(oClass)
    }

}, 1000)

if(checkWin(currentClass)) {
    winningMessageElement.classList.add('show'); */


function handleClick(e) {
    let cell = e.target;
    let currentClass = oTurn ? oClass : xClass;
    //Place the mark
    //Check for win
    placeMark(cell, currentClass);
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
     cell.classList.add(currentClass);
}

function switchTurns() {
    let playerOne = document.getElementById('input-player1');
    let playerTwo = document.getElementById('input-player2');

    oTurn = !oTurn;

    if(!oTurn) {
        playerOne.style.backgroundColor = 'rgb(97, 157, 236)';
        playerTwo.style.backgroundColor = 'white'; 
        

    } else {
        playerOne.style.backgroundColor = 'white';
        playerTwo.style.backgroundColor = 'rgb(97, 157, 236)';
    } 
    
    
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
        winningMessageTxt.innerText = `${oTurn ? 'Player 2' : 'Player 1'} Wins!`;
    }
    winningMessageElement.classList.add('show');
    console.log('gover')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(oClass)
    })
}

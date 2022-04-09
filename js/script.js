//L'utente seleziona tramite l'apposito menù il livello di difficolta
//Creare una funzione che genera una griglia, le dimensioni variano in baso al livello di difficoltà
    //Con difficoltà Easy => tra 1 e 100
    //Con difficoltà Hard => tra 1 e 81
    //Con difficoltà Crazy => tra 1 e 49
//Creare una funzione che permette di colorare i quadratini al click dell'utente

//SEZIONE DOM
//Creare una funzione per generare 16 numeri casuali per le bombe
//Creare una funzione per verificare se l'utente clicca su uno dei 16 numeri generati, in quel caso, la casella si colora di rosso e l'utente avrà perso
//La partita si conclude se l'utente clicca su una bomba o se esaurisce i numeri liberi

//Variabili
const bombs = []
const totalBombs = 16;
let score = 0
let maxScore = 0

//Creo la funzione per selezionare la difficoltà
function setLevel(event){

    const levelDifficulty = document.getElementById('level-difficulty').value;
    let numSquare;
    switch (levelDifficulty) {
        case "1":
        default:
          numSquare = 100;
          break;
        case "2":
          numSquare = 81;
          break;
        case "3":
          numSquare = 49;
          break;
      }

      maxScore = numSquare - totalBombs;
      let squareperSide = Math.sqrt(numSquare);
      generateGrid(numSquare, squareperSide);
      generateBomb(numSquare);

}

//Creo la funzione per generare la griglia
function generateGrid(numSquare, squareperSide){

    const gridContainer = document.querySelector('.mContainer');
    gridContainer.innerHTML = "";
    let row = document.createElement('div');
    row.className = 'grid';
    for (let i = 1; i <= numSquare; i++){

        const square = generateCell(i, squareperSide);
        row.append(square);

    }

    gridContainer.append(row);

}

//Creo la funzione per generare le box
function generateCell(num, squareperSide){

    let square = document.createElement("div");
    square.className = "box";
    square.style.width = `calc(100% / ${squareperSide})`;
    square.style.height = `calc(100% / ${squareperSide})`;
    square.innerHTML = `<span>${num}</span>`;
    square.addEventListener("click", colorCell);
    return square;

}

//Creo la funzione per colorare la cella
function colorCell(){

    let num = parseInt(this.innerText);
    this.removeEventListener("click", colorCell);
    if (bombs.includes(num)){

        this.classList.add("red");
        this.innerHTML = '<img id="bomb" src="./img/bomb.jpg" alt="bomb">'

    } else {

        this.classList.add("pink");

    }

}


document.getElementById("start").addEventListener("click", setLevel);

//Creo la funzione per generare numeri random
function numRandom(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * max + min)

}

//Creo la funzione per generare le bombe
function generateBomb(numSquare){

    bombs.length = 0;
    while (bombs.length < totalBombs){

        let numBomb = numRandom(1, numSquare);
        if (!bombs.includes(numBomb)){

            bombs.push(numBomb);

        }

    }

}
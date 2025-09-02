const boardEl = document.getElementById('board');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const minesInput = document.getElementById('mines');
const startBtn = document.getElementById('startBtn');
const minesLeftEl = document.getElementById('minesLeft');
const timerEl = document.getElementById('timer');
const flagModeBtn = document.getElementById('flagModeBtn');

let rows = 9, cols = 9, mines = 10;
let grid = []; // {mine:boolean, revealed:boolean, flagged:boolean, adj:number}
let started = false;
let timer = null; let seconds = 0;
let flagsPlaced = 0;
let flagMode = false;

function init() {
    // get number rows
    // get number of cols
    // get number of mines

    // create grid
    // initialize game stats/timer
    // render the grid on the page
}

function placeMines(row,col) {

}

function render() {
    boardEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    boardEl.innerHTML = '';
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const cell = grid[r][c];
        const tile = document.createElement('div');
        tile.className = 'tile' + (cell.revealed? ' revealed':'') + (cell.flagged? ' flagged':'');
        tile.dataset.r = r; tile.dataset.c = c;
        if(cell.revealed){
          if(cell.mine){ tile.classList.add('mine'); tile.textContent = '💣'; }
          else if(cell.adj>0){ tile.textContent = cell.adj; tile.style.color = colorForNumber(cell.adj); }
        } else if(cell.flagged){ tile.textContent = '⚑'; }

        tile.addEventListener('click', (e)=>{
          e.preventDefault(); onTileClick(r,c);
        });
        tile.addEventListener('contextmenu', (e)=>{ e.preventDefault(); onTileRightClick(r,c); });

        boardEl.appendChild(tile);
      }
    }
}

function onTileClick(row, col) {

}

function revealAllMines() {
    for(let r=0;r<rows;r++)
        for(let c=0;c<cols;c++) 
            if(grid[r][c].mine) 
                grid[r][c].revealed = true;
    render();
}

function checkWin() {
    let unrevealed=0;
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const cell = grid[r][c];
        if(!cell.revealed) unrevealed++;
      }
    }
    if(unrevealed === mines){
      gameOver(true);
    }
}

function gameOver(won) {
    stopTimer();
    started=false;

    if(won){
      setTimeout(()=> alert('You win! Time: '+seconds+'s'),10);
    } else {
      setTimeout(()=> alert('BOOM! You hit a mine.'),10);
    }
}

function startTimer() {
    stopTimer(); 
    seconds=0; 
    updateTimer(); 
    timer = setInterval(()=>{ seconds++; updateTimer(); },1000);
}

function stopTimer() { 
    if(timer) clearInterval(timer); timer = null; 
}
function updateTimer() { 
    timerEl.textContent = seconds + 's'; 
}

function updateMinesLeft() { 
    minesLeftEl.textContent = Math.max(0, mines - flagsPlaced); 
}
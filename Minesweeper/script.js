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

    const forbidden = new Set();
    for(let r=firstRow-1;r<=firstRow+1;r++){
      for(let c=firstCol-1;c<=firstCol+1;c++){
        if(r>=0 && r<rows && c>=0 && c<cols) forbidden.add(r+','+c);
      }
    }

    let toPlace = mines;

    while(toPlace>0){
      const r = Math.floor(Math.random()*rows);
      const c = Math.floor(Math.random()*cols);
      const key = r+','+c;
      if(forbidden.has(key)) continue;
      if(grid[r][c].mine) continue;
      grid[r][c].mine = true; toPlace--;
    }
    
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        if(grid[r][c].mine){grid[r][c].adj=-1; continue}
        let count=0;
        for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){
          if(dr===0 && dc===0) continue;
          const nr=r+dr, nc=c+dc;
          if(nr>=0 && nr<rows && nc>=0 && nc<cols && grid[nr][nc].mine) count++;
        }
        grid[r][c].adj = count;
      }
    }
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
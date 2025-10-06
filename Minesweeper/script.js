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

function clampMineCount(){
  const max = Math.max(1, Math.floor(rows*cols - 1));
  if(mines > max) mines = max;
  minesInput.max = max;
  minesInput.value = mines;
}

function init(){
    rows = parseInt(rowsInput.value,10) || 9;
    cols = parseInt(colsInput.value,10) || 9;
    mines = parseInt(minesInput.value,10) || 10;
    clampMineCount();
    grid = Array.from({length:rows},()=>Array.from({length:cols},()=>({mine:false,revealed:false,flagged:false,adj:0})))
    started = false; seconds = 0; flagsPlaced = 0; updateTimer(); updateMinesLeft(); render();
}

function placeMines(firstRow, firstCol){
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

function render(){
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

function colorForNumber(n){
    const map = {1:'#2563eb',2:'#16a34a',3:'#dc2626',4:'#7c3aed',5:'#b45309',6:'#0891b2',7:'#374151',8:'#111827'};
    return map[n] || '#000';
}

function onTileClick(r,c){
    if(!started){ placeMines(r,c); started=true; startTimer(); }
    if(flagMode){ toggleFlag(r,c); return; }
    const cell = grid[r][c];
    if(cell.revealed || cell.flagged) return;
    if(cell.mine){ revealAllMines(); gameOver(false); return; }
    floodReveal(r,c);
    render(); checkWin();
}

function onTileRightClick(r,c){
    toggleFlag(r,c);
}

function toggleFlag(r,c){
    const cell = grid[r][c]; if(cell.revealed) return;
    cell.flagged = !cell.flagged; flagsPlaced += cell.flagged?1:-1; updateMinesLeft(); render();
    checkWin();
}

function floodReveal(r,c){
    const stack = [[r,c]];
    while(stack.length){
      const [x,y] = stack.pop();
      const cell = grid[x][y];
      if(cell.revealed || cell.flagged) continue;
      cell.revealed = true;
      if(cell.adj===0){
        for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){
          const nx = x+dr, ny = y+dc;
          if(nx>=0 && nx<rows && ny>=0 && ny<cols && !grid[nx][ny].revealed && !grid[nx][ny].mine){ stack.push([nx,ny]); }
        }
      }
    }
}

function revealAllMines(){
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++) if(grid[r][c].mine) grid[r][c].revealed = true;
    render();
}

function checkWin(){
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

function gameOver(won){
    stopTimer();
    started=false;
    if(won){
      setTimeout(()=> alert('You win! Time: '+seconds+'s'),10);
    } else {
      setTimeout(()=> alert('BOOM! You hit a mine.'),10);
    }
}

function startTimer(){
    stopTimer(); 
    seconds=0; 
    updateTimer(); 
    timer = setInterval ( ()=> { 
      seconds++; 
      updateTimer(); 
    },1000);
}

function stopTimer() { 
  if(timer) clearInterval(timer); 
  timer = null; 
}

function updateTimer() { 
  timerEl.textContent = seconds + 's'; 
}

function updateMinesLeft() {
   minesLeftEl.textContent = Math.max(0, mines - flagsPlaced); 
}

startBtn.addEventListener('click', ()=>{ init(); });
flagModeBtn.addEventListener('click', ()=>{ flagMode = !flagMode; flagModeBtn.textContent = 'Flag mode: '+(flagMode? 'On':'Off'); flagModeBtn.style.opacity = flagMode? '0.95':'1'; });
minesInput.addEventListener('change', ()=>{ mines = parseInt(minesInput.value,10) || 1; clampMineCount(); updateMinesLeft(); });
rowsInput.addEventListener('change', ()=>{ rows = parseInt(rowsInput.value,10) || 9; clampMineCount(); init(); });
colsInput.addEventListener('change', ()=>{ cols = parseInt(colsInput.value,10) || 9; clampMineCount(); init(); });

window.addEventListener('keydown', (e)=>{ if(e.code==='Space'){ e.preventDefault(); flagMode = !flagMode; flagModeBtn.textContent = 'Flag mode: '+(flagMode? 'On':'Off'); } });


init()
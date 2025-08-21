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


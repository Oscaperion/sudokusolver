//requiring path and fs modules
var path = require('path');
var fs = require('fs');
const url = require('url');
const http = require('http');

var sudokuGrid = {};

const startLetterPos = 'A'.charCodeAt();
function col(colNumber) { return String.fromCharCode(startLetterPos - 1 + colNumber); }

// This should create values for different positions in the grid. The letter refers to the column, the number refers to the row.
{
   for (let i = 1; i <= 9; i++) {
      let tmp1 = col(i);
      
      for (let j = 1; j <= 9; j++) {
         let tmp2 = tmp1 + j;
         sudokuGrid[tmp2] = {};
         
         // Each cell will have information what the assigned number is (value) and - if still not assigned - what other numbers it could still be
         sudokuGrid[tmp2]["id"] = tmp2;
         sudokuGrid[tmp2]["value"] = 0;
         sudokuGrid[tmp2]["assigned"] = false;
         
         for (let k = 1; k <= 9; k++) {
            sudokuGrid[tmp2]["canBe" + k] = true;
         }
      }
   }
   sudokuGrid["E4"].value = 5;
}

function getRow(rowNumber) {
   if (rowNumber > 9 || rowNumber < 1) throw new Error('Value not compatible! Needs to be within 1-9 range');

   let returnArray = [];

   for (let i = 1; i <= 9; i++) {
      returnArray.push(sudokuGrid[col(i) + rowNumber]);
   }
   
   return returnArray;
}

function getCol(colNumber) {
   if (colNumber > 9 || colNumber < 1) throw new Error('Value not compatible! Needs to be within 1-9 range');

   let returnArray = [];

   let colTmp = col(colNumber);
   
   for (let i = 1; i <= 9; i++) {
      returnArray.push(sudokuGrid[colTmp + i]);
   }
   
   return returnArray;
}

// 1 = Top-left, 2 = Top-middle, 3 = Top-right
// 4 = Middle-left, 5 = Middle, 6 = Middle-right
// 7 = Bottom-left, 8 = Bottom-middle, 9 = Bottom-right
function getSubGrid(gridId) {
   if (gridId > 9 || gridId < 1) throw new Error('Value not compatible! Needs to be within 1-9 range');

   let returnArray = [];

   let tmpCol = 0;
   if (gridId === 2 || gridId === 5 || gridId === 8) tmpCol = 1;
   if (gridId === 3 || gridId === 6 || gridId === 9) tmpCol = 1;

   let tmpRow = 0;
   if (gridId >= 4 && gridId <= 6) tmpRow = 1;
   if (gridId >= 7 && gridId <= 9) tmpRow = 2;

   for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
         returnArray.push(sudokuGrid[col(i + (tmpCol * 3)) + (j + (tmpRow * 3))]);
      }
   }

   return returnArray;
}

console.log(sudokuGrid);
console.log(sudokuGrid.E4);
console.log(getRow(4)[4]);
console.log(getCol(5)[3]);
console.log(getSubGrid(10));
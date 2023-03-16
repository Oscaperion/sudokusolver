//requiring path and fs modules
var path = require('path');
var fs = require('fs');
const url = require('url');
const http = require('http');

var sudokuGrid = {};

// This should create values for different positions in the grid. The letter refers to the column, the number refers to the row.
{
   let startPoint = 'A'.charCodeAt();
   let endPoint = startPoint + 9;
   for (let i = startPoint; i < endPoint; i++) {
      let tmp1 = String.fromCharCode(i);
      
      for (let j = 1; j <= 9; j++) {
         let tmp2 = tmp1 + j;
         sudokuGrid[tmp2] = {};
      }
   }
   sudokuGrid["E4"] = 5;
}

console.log(sudokuGrid.A1);
console.log(sudokuGrid);
//requiring path and fs modules
var path = require('path');
var fs = require('fs');
const url = require('url');
const http = require('http');

var sudokuGrid = {};

const indicator = "canBe";
const startLetterPos = 'A'.charCodeAt();
function col(colNumber) { return String.fromCharCode(startLetterPos - 1 + colNumber); }

// This should create values for different positions in the grid. The letter refers to the column, the number refers to the row.
{
   for (let i = 1; i <= 9; i++) {
      let tmp1 = col(i);
      
      for (let j = 1; j <= 9; j++) {
         let tmp2 = tmp1 + j;
         
         // 1 = Top-left, 2 = Top-middle, 3 = Top-right
         // 4 = Middle-left, 5 = Middle, 6 = Middle-right
         // 7 = Bottom-left, 8 = Bottom-middle, 9 = Bottom-right
         let subgrid = Math.floor((j - 1) / 3) * 3 + Math.floor((i - 1) / 3) + 1;
         sudokuGrid[tmp2] = {};
         
         // Each cell will have information what the assigned number is (value) and - if still not assigned - what other numbers it could still be
         sudokuGrid[tmp2]["id"] = tmp2;
         sudokuGrid[tmp2]["col"] = i;
         sudokuGrid[tmp2]["row"] = j;
         sudokuGrid[tmp2]["subgrid"] = subgrid;
         sudokuGrid[tmp2]["value"] = 0;
         sudokuGrid[tmp2]["assigned"] = false;
         
         for (let k = 1; k <= 9; k++) {
            sudokuGrid[tmp2][indicator + k] = true;
         }
      }
   }
   //sudokuGrid["E4"].value = 5;

}
    /*
function getRow(rowNumber) {
   if (rowNumber > 9 || rowNumber < 1) throw new Error('Value not compatible! Needs to be within 1-9 range');

   let returnArray = [];

   for (let i = 1; i <= 9; i++) {
      returnArray.push(col(i) + rowNumber);
   }

   return returnArray;
}  */

function getRow(rowNumber) {
   let filteredData = Object.values(sudokuGrid).filter(item => item.row === rowNumber);
   //console.log(filteredData.map(item => item.id));
   return filteredData.map(item => item.id);
}

/*
function getCol(colNumber) {
   if (colNumber > 9 || colNumber < 1) throw new Error('Value not compatible! Needs to be within 1-9 range');

   let returnArray = [];

   let colTmp = col(colNumber);

   for (let i = 1; i <= 9; i++) {
      returnArray.push(colTmp + i);
   }

   return returnArray;
} */

function getCol(colNumber) {
   let filteredData = Object.values(sudokuGrid).filter(item => item.col === colNumber);
   //console.log(filteredData.map(item => item.id));
   return filteredData.map(item => item.id);
}
     /*
// 1 = Top-left, 2 = Top-middle, 3 = Top-right
// 4 = Middle-left, 5 = Middle, 6 = Middle-right
// 7 = Bottom-left, 8 = Bottom-middle, 9 = Bottom-right
function getSubGrid(gridId) {
   if (gridId > 9 || gridId < 1) throw new Error('Value not compatible! Needs to be within 1-9 range');

   let returnArray = [];

   let tmpCol = 0;
   if (gridId === 2 || gridId === 5 || gridId === 8) tmpCol = 1;
   if (gridId === 3 || gridId === 6 || gridId === 9) tmpCol = 2;

   let tmpRow = 0;
   if (gridId >= 4 && gridId <= 6) tmpRow = 1;
   if (gridId >= 7 && gridId <= 9) tmpRow = 2;

   for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
         returnArray.push(col(i + (tmpCol * 3)) + (j + (tmpRow * 3)));
      }
   }

   return returnArray;
}  */

function getSubGrid(gridId) {
   let filteredData = Object.values(sudokuGrid).filter(item => item.subgrid === gridId);
   //console.log(filteredData.map(item => item.id));
   return filteredData.map(item => item.id);
}

                               /*
console.log(sudokuGrid);
console.log(sudokuGrid.E4);
console.log(getRow(4)[4]);
console.log(getCol(5)[3]);
console.log(getSubGrid(5));  */
                           /*
printGrid();
setValue("A1",5);
setValue("B1",3);
setValue("E1",7);

setValue("A2",6);
setValue("D2",1);
setValue("E2",9);
setValue("F2",5);

setValue("B3",9);
setValue("C3",8);
setValue("H3",6);

setValue("A4",8);
setValue("E4",6);
setValue("I4",3);

setValue("A5",4);
setValue("D5",8);
setValue("F5",3);
setValue("I5",1);

setValue("A6",7);
setValue("E6",2);
setValue("I6",6);

setValue("B7",6);
setValue("G7",2);
setValue("H7",8);

setValue("D8",4);
setValue("E8",1);
setValue("F8",9);
setValue("I8",5);

setValue("E9",8);
setValue("H9",7);
setValue("I9",9);         */

/*
console.log(sudokuGrid);
console.log(getSubGrid(9));
console.log(isApplicableValue("G8",6));
console.log(isApplicableValue("H3",1));     */

//console.log(sudokuGrid);

setValue("A2",2);
setValue("A6",9);
setValue("A7",1);

setValue("B1",9);
setValue("B8",8);

setValue("C1",1);
setValue("C2",3);
setValue("C4",2);
setValue("C7",5);

setValue("D3",4);
setValue("D4",8);
setValue("D6",1);
setValue("D7",2);

setValue("E1",7);
setValue("E9",1);

setValue("F3",2);
setValue("F4",6);
setValue("F6",4);
setValue("F7",7);

setValue("G3",9);
setValue("G6",6);
setValue("G8",5);
setValue("G9",7);

setValue("H2",5);
setValue("H9",6);

setValue("I3",7);
setValue("I4",9);
setValue("I8",1);

printGrid();
fillApplicableSpaces();          /*
console.log(sudokuGrid["F1"]);
console.log(sudokuGrid["F8"]);
console.log(sudokuGrid["F9"]); */
printGrid();

function setValue(cellId,value) {
   if (sudokuGrid[cellId].assigned === true) throw new Error('Value already assigned on cell ' + cellId + '!');
   if (sudokuGrid[cellId][indicator + value] === false) throw new Error('Value cannot be added on cell ' + cellId + '! It has already value ' + sudokuGrid[cellId].value);

   sudokuGrid[cellId].value = value;
   sudokuGrid[cellId].assigned = true;
   //wipeCell(cellId,value);
   notifyCells(cellId, value);
}

function notifyCells(cellId, value) {
   let tmpId = cellId;

   let tmpCol = getCol(sudokuGrid[cellId].col);
   let tmpRow = getRow(sudokuGrid[cellId].row);
   let tmpSgrid = getSubGrid(sudokuGrid[cellId].subgrid);

   for (let i = 0; i < 9; i++) {
      sudokuGrid[tmpCol[i]][indicator + value] = false;
      sudokuGrid[tmpRow[i]][indicator + value] = false;
      sudokuGrid[tmpSgrid[i]][indicator + value] = false;
   }

   /*
   for (let i = 1; i <= 9; i++) {
         //console.log("sas");
      if (getSubGrid(i).includes(tmpId)) {
         let tmp2 = getSubGrid(i);
         //console.log(tmp2);
         for (let j = 0; j < 9; j++) {
         //console.log("saws");
            sudokuGrid[tmp2[j]][indicator + value] = false;
         }
         //console.log("sus");
         break;
      }
   }    */
}

function isApplicableValue(cellId,checkValue) {
   let tmp1 = sudokuGrid[cellId];
   
   if (tmp1.assigned) return false;
   
   return tmp1[indicator + checkValue];
}

function fillApplicableSpaces() {
  let changed = true;
  while (changed) {
   changed = false;
   for (let i = 1; i <= 9; i++) {
      let tmpRow = getRow(i);
      let tmpCol = getCol(i);
      let tmpSGrid = getSubGrid(i);

      // j = row, col, grid; k = value
      for (let k = 1; k <= 9; k++) {

         let applicableCellsRow = 0;
         let applicableCellR = "";
         let applicableCellsCol = 0;
         let applicableCellC = "";
         let applicableCellsSGrid = 0;
         let applicableCellG = "";

         for (let j = 0; j < 9; j++) {
            if (isApplicableValue(tmpRow[j], k)) { applicableCellsRow++; applicableCellR = tmpRow[j]; }
            if (isApplicableValue(tmpCol[j], k)) { applicableCellsCol++; applicableCellC = tmpCol[j]; }
            if (isApplicableValue(tmpSGrid[j], k)) { applicableCellsSGrid++; applicableCellG = tmpSGrid[j]; }
         }

         if (applicableCellsRow === 1) {
            setValue(applicableCellR,k); changed = true; console.log("Setting " + applicableCellR + " as " + k);
         } if (applicableCellsCol === 1 && applicableCellC !== applicableCellR) {
            setValue(applicableCellC,k); changed = true; console.log("Setting " + applicableCellC + " as " + k);
         } if (applicableCellsSGrid === 1 && applicableCellG !== applicableCellR && applicableCellG !== applicableCellC) {
            setValue(applicableCellG,k); changed = true; console.log("Setting " + applicableCellG + " as " + k);
         }
      }
                
      for (let y = 1; y <= 9; y++) {
         for (let x = 1; x <= 9; x++) {
            let tmpo = 0;
            let tmpId = "";
            let tmpValue = 0;

            for (let z = 1; z <= 9; z++) {
               if (sudokuGrid[col(y) + x][indicator + z] === true) {
                  tmpo++;
                  tmpId = col(y) + x;
                  tmpValue = z;
               }
            }

            if (tmpo === 1 && sudokuGrid[tmpId].assigned === false) {
               setValue(tmpId,tmpValue);
               changed = true;
               console.log("Setting " + tmpId + " as " + tmpValue);
            }
         }
      }
   }
  }
}

function printGrid() {
   console.log("       SUDOKU GRID");
   console.log("+-------+-------+-------+");
   let tmp = "| ";
   for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 9; j++) {
         tmp += sudokuGrid[col(j) + i].value + " ";
         if (j === 3 || j === 6 || j === 9) tmp += "| ";
      }
      console.log(tmp);
      tmp = "| ";
   }
   console.log("+-------+-------+-------+");
   tmp = "| ";
   for (let i = 4; i <= 6; i++) {
      for (let j = 1; j <= 9; j++) {
         tmp += sudokuGrid[col(j) + i].value + " ";
         if (j === 3 || j === 6 || j === 9) tmp += "| ";
      }
      console.log(tmp);
      tmp = "| ";
   }
   console.log("+-------+-------+-------+");
   tmp = "| ";
   for (let i = 7; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
         tmp += sudokuGrid[col(j) + i].value + " ";
         if (j === 3 || j === 6 || j === 9) tmp += "| ";
      }
      console.log(tmp);
      tmp = "| ";
   }
   console.log("+-------+-------+-------+");
}

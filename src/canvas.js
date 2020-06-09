const COLORS = {
    Orange: "#fcba03",
    Red: "#fc033d",
    Purple: "#6203fc",
    Blue: "#0373fc",
    Teal: "#03fca1",
    Lime: "#8ed402"
}

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let counter;
let resolution = 20;



let userString = "";

let userHash;
let userColor;

function redo() {
    let newUserString = document.getElementById("string2gen").value;
    if (newUserString !== userString) {
        userString = newUserString
        restart();
    }
}

function keyPressed() {
    if (keyCode === ENTER) {
      redo();
  }
}

function restart() {
    userHash = gridHash(userString);
    userColor = colorHash(userString);
    counter = 0;

    if (userString != "") {
        let dom = document.getElementById('body');
        dom.style.textShadow = "3px 3px 2px " + userColor;
    }

    var canvas = createCanvas(400, 400);
    canvas.parent('app');
    background(0);
    cols = width / resolution / 2;
    rows = height / resolution / 2;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

function setup() {
    frameRate(60);
    restart();
}

function doSave() {
    let saveName = userString + " - Icono.jpg";
    save(saveName);
}

function draw() {

    if (counter >= 100) {
        return;
    }

    spot = getCoords(counter);
    grid[spot[0]][spot[1]] = userHash[counter];
    counter ++;
    putOnBoard();
}

function putOnBoard() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 1) fill(userColor);
            else fill(0);
            
            stroke(0);
            rect(x, y, resolution, resolution);
            rect(x, height-y-resolution, resolution, resolution);
            rect(width-x-resolution, y, resolution, resolution);
            rect(width-x-resolution, height-y-resolution, resolution, resolution);
        }
    }
}

function getCoords(c) {
    if (c == 0) return [0, 0];
    y = Math.ceil(c / rows);
    x = c % cols;
    if (y > 0) y -= 1;
    if (c < rows) y = 0;
    if (x == 0) y += 1;
    return [x, y];
}

function binHash(str) {
    bin = text2Binary(str);
    if (bin.length == 0) return "0000000000";
    if (bin.length == 6) return "0000" + bin;
    if (bin.length == 7) return "00000" + bin;
    
    if (bin.length > 10) {
        let newStr = bin + "";
        let left = bin.length - 10;
        let side = true;
        for (let i = 0; i < left; i++) {
            if (side) {
                newStr = newStr.replace(newStr[i], "");
                side = !side;
            }
            else {
                newStr = newStr.split("").reverse().join("").replace(newStr[i], "");
                side = !side;
            }
        }
        return newStr;
    }
}

function text2Binary(string) {
    return string.split('').map(function (char) {
        return char.charCodeAt(0).toString(2);
    }).join('');
}

function gridHash(str) {
    grid = binHash(str);
    return grid.repeat(10);
}

function colorHash(str) {
    switch (str.length % 6) {
        case 1:
            return COLORS.Orange;
        case 2:
            return COLORS.Red;
        case 3:
            return COLORS.Purple;
        case 4:
            return COLORS.Blue;
        case 5:
            return COLORS.Teal;
        default:
            return COLORS.Lime;
    }
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
      document.getElementById("myModal").style.display = "none";
    }
}
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
let counter = 0;
let resolution = 20;

let wrapAround = true;

function setup() {
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

    frameRate(60);
}

let userString = "pistachio";

let userHash = gridHash(userString);
//let userColor = colorHash(userString);
function draw() {

    if (counter >= 100) {
        noLoop();
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

            //if (grid[i][j] == 1) fill(userColor);
            if (grid[i][j] == 1) fill(255);
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

// no longer used
function snakeHash(str, len) {
    if (len > 200) return "no";
    let n1 = 0;
    for (let i = 0; i < str.length; i++) {
      n1 += (str[i].charCodeAt(0)**2);
    }
    let s1 = n1 + "";
    let n2 = 0;
    for (let i = str.length-1; i > 0; i--) {
      n2 += (str[i].charCodeAt(0)**2);
    }
    let s2 = n2 + "";
  
    let s3 = "";
    let n3 = s1.length;
    if (s2.length < n3) n3 = s2.length;
    for (let i = 0; i < n3; i++) {
      s3 = s1[i] + s2[i] + s3;
    }
  
    if (s3.length == len) return parseInt(s3);
    if (s3.length > len) return parseInt(s3.slice(0, len));
    else {
      let n4 = len-s3.length
      for(let i = 0; i < n4; i++) {
        s3 = s3 + s3[parseInt(s2[parseInt(s1[i%s1.length])%s2.length])%s3.length];
      }
    }
  
    return s3;
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
    let numbers = "";
    for (let i = 0; i < str.length; i++) {
        numbers += str[i].charCodeAt(0);
    }
    let distribution = {
        zeros: 0,
        twothrees: 0,
        fives: 0,
        sixnines: 0,
        eights: 0,
        elevens: 0
    };
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] == '0') distribution.zeros += 1;
        if (numbers[i] == '2' || numbers[i] == '3') distribution.twothrees += 1;
        if (numbers[i] == '5') distribution.fives += 1;
        if (numbers[i] == '6' || numbers[i] == '9') distribution.sixnines += 1;
        if (numbers[i] == '8') distribution.eights += 1;
        if (numbers[i] == '1' && numbers[i+1] == '1') distribution.elevens += 1;
    }
    biggest = 0;
    element = "";
    for (let num in distribution) {
        if (distribution[num] > biggest) {
            biggest = distribution[num];
            element = num;
        }
    }
    switch (element) {
        case zeros:
            return COLORS.Orange;
        case twothrees:
            return COLORS.Red;
        case fives:
            return COLORS.Purple;
        case sixnines:
            return COLORS.Blue;
        case eights:
            return COLORS.Teal;
        default:
            return COLORS.Lime;
    }
}
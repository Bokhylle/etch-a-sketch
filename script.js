//variables
let gridSizeChoice;
let rotationDegreesY = 0;
let rotationDegreesX = 1;

//html elements
const root = document.querySelector(':root');
const etchScreen = document.querySelector('.screen-container');
const knobX = document.querySelector('.knob-x');
const knobY = document.querySelector('.knob-y');
const resetBtn = document.querySelector('.reset');
const gridSizeInput = document.querySelector('.input');
//created elements
const sketchSquare = document.createElement('div')

function cloneLoop() {
    let cloned = sketchSquare.cloneNode()
    cloned.classList.add('etch-tile');
    etchScreen.appendChild(cloned);
};
function populateScreen(rowSize = 16) {
    let tileSize = 800 / rowSize;
    document.documentElement.style.setProperty('--tileSize', `${tileSize}px`);
    let tileAmount = rowSize ** 2;
    for (n = 0; n < tileAmount; n++) {
        cloneLoop();
    };
};
function cleanUpScreen(rows = 64) {
    if (rows == 0 || rows == '') {rows = 64};
    let tiles = rows ** 2
    for (n = 0; n < tiles; n++) {
        etchScreen.removeChild(etchScreen.lastElementChild);
    }
}
function cleanUpScreen2() {
    while (etchScreen.firstElementChild) {
        etchScreen.removeChild(etchScreen.lastElementChild)
    }
}
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('clicked');
}
resetBtn.addEventListener('transitionend', removeTransition);

function changeColor() {
    this.style.backgroundColor = 'black'
}
resetBtn.onclick = function() {
    this.classList.add("clicked");
    if (gridSizeInput.value > 0){
    gridSizeChoice = gridSizeInput.value;
    cleanUpScreen2();
    populateScreen(gridSizeChoice);
    } else {
        cleanUpScreen2()
        populateScreen()
        gridSizeChoice = 16
    }
let allTiles = document.querySelectorAll('.etch-tile');
allTiles.forEach(etchTile => etchTile.addEventListener('mouseover', changeColor))
allTiles.forEach(etchTile => etchTile.addEventListener('mouseenter', eventListen))

allTiles.forEach(etchTile => etchTile.addEventListener('touchmove', changeColor2))
allTiles.forEach(etchTile => etchTile.addEventListener('touchmove', eventListen2))

}
function changeColor2(e) {
    //console.log(e.changedTouches[0].clientX);
    //console.log(this.classList)
    let tileChecker = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).classList.contains('etch-tile')
   //console.log(tileChecker)
    if (tileChecker) {
    document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).style.backgroundColor = 'black';
    }
}
function eventListen2(e) {
    console.log(e);
}
function eventListen(e) {
    // console.log('clientx ' + e.clientX);
    // console.log('clienty ' + e.clientY);
    // console.log(compareOffsetLeft(e))
    // console.log(compareOffsetTop(e))
    let xDelta = compareOffsetLeft(e)
    let yDelta = compareOffsetTop(e)
    calculateRotation(xDelta, yDelta);
    storeOffsetLeft(e);
    storeOffsetTop(e);
    //console.log(e.path[0].offsetLeft)
    
}
let previousTileOffsetLeft = 0;
let previousTileOffsetTop = 0;
//two functions to return clientx and client y and store in variable
function storeOffsetLeft(e) {
    if (isNaN(e.path[0].offsetLeft)) {
        return previousTileOffsetTop = 1;
    }
    return previousTileOffsetLeft = e.path[0].offsetLeft
}
function storeOffsetTop(e) {
    return previousTileOffsetTop = e.path[0].offsetTop
}
//function to subtract x and y variables from new clientx and clienty
function compareOffsetLeft(e) {
    let xDelta = previousTileOffsetLeft - e.path[0].offsetLeft
    if (isNaN(xDelta)) {return}
    return xDelta
}
function compareOffsetTop(e) {
    let yDelta = previousTileOffsetTop - e.path[0].offsetTop
    return yDelta
}
function calculateRotation(x, y) {
    let rotationValue;
    if (y ** 2 > x ** 2) {
        rotationValue = (Math.sqrt(gridSizeChoice) / 200) * y;
        return rotateKnobY(rotationValue);
    } else (y ** 2 < x ** 2) ;{
        rotationValue = (Math.sqrt(gridSizeChoice) / 200) * (x * -1);
        console.log(rotationValue)
        return rotateKnobX(rotationValue);
        
    }
}
function rotateKnobY(rotationValue) {
    rotationDegreesY += rotationValue * 45
    root.style.setProperty("--rotateKnobY", (rotationDegreesY + 'deg'))
    //console.log(rotationValue);
}
function rotateKnobX(rotationValue) {
    rotationDegreesX += rotationValue * 45
    root.style.setProperty("--rotateKnobX", (rotationDegreesX + 'deg'))
    //console.log(rotationValue * 45);
}

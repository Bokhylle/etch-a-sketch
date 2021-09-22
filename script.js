//variables
let gridSizeChoice;

//html elements
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
function populateScreen(rowSize = 64) {
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
    }
let allTiles = document.querySelectorAll('.etch-tile');
allTiles.forEach(etchTile => etchTile.addEventListener('mouseover', changeColor))
allTiles.forEach(etchTile => etchTile.addEventListener('mouseenter', eventListen))

allTiles.forEach(etchTile => etchTile.addEventListener('touchmove', changeColor2))
}
function changeColor2(e) {
    //console.log(e.changedTouches[0].clientX);
    //console.log(this.classList)
    let tileChecker = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).classList.contains('etch-tile')
   //console.log(tileChecker)
    if (tileChecker) {
    document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY).style.backgroundColor = 'black';
    console.log(1)
    }
}
function eventListen(e) {
    console.log('clientx ' + e.clientX);
    console.log('clienty ' + e.clientY);

}
let previousTileClientX;
let previousTileClientY;
//two functions to return clientx and client y and store in variable
function storeClientX(e) {
    return previousTileClientX = e.clientX
}
function storeClientY(e) {
    return previousTileClientY = e.clientY
}
//function to subtract x and y variables from new clientx and clienty

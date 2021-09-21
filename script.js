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
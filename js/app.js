// >> OBJECTS <<
let player = {
    hp: 10,
    barracks: []
};

let computer = {
    hp: 10,
    barracks: []
};

let peon = {
    name: '',
    job: ''
};

// >> VARIABLES >>
let start = true;


// >> ELEMENT CASHE <<
const playerHpElement = document.querySelector('#player-hitpoints');
const computerHpElement = document.querySelector('#computer-hitpoints');
const createPeonElement = document.querySelector('#create-peon');
const selectPeonElement = document.querySelector('#select-peon');
const outputElement = document.querySelector('#output');
const startElement = document.querySelector('#start-button');
const tempElement = document.querySelector('.temp');


// >> FUNCTIONS <<
const addInputAndSubmit = () => {
    const newInput = document.createElement('input');
    newInput.setAttribute('id', 'inputBox');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Type here');

    const newButton = document.createElement('button');
    newButton.setAttribute('id', 'inputButton');
    newButton.innerText = 'Submit';
    
    tempElement.appendChild(newInput);
    tempElement.appendChild(newButton);
};

const startGame = () => {
    addInputAndSubmit();

    outputElement.innerHTML = 'Welcome to the game!<br><br>What is your name?';
}

const startHandler = () => {
    startElement.remove()
    startGame();
}

const createPeonHandler = () => {
    if (!start) {
        outputElement.textContent = 'You created a peon!!';
    }
}

const selectPeonHandler = () => {
    if (!start) {
        outputElement.textContent = 'You selected a peon!!';
    }
}


// >> EVENT LISTENERS <<
createPeonElement.addEventListener('click', createPeonHandler);
selectPeonElement.addEventListener('click', selectPeonHandler);
startElement.addEventListener('click', startHandler);

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


// >> ELEMENT CASHE <<
const playerHpElement = document.querySelector('#player-hitpoints');
const computerHpElement = document.querySelector('#computer-hitpoints');
const createPeonElement = document.querySelector('#create-peon');
const selectPeonElement = document.querySelector('#select-peon');
const outputElement = document.querySelector('#output');
const startElement = document.querySelector('#start-button');


// >> FUNCTIONS <<
const startHandler = () => {
    outputElement.textContent = 'You started the game!!';
}

const createPeonHandler = () => {
    outputElement.textContent = 'You created a peon!!';
}

const selectPeonHandler = () => {
    outputElement.textContent = 'You selected a peon!!';
}


// >> EVENT LISTENERS <<
createPeonElement.addEventListener('click', createPeonHandler);
selectPeonElement.addEventListener('click', selectPeonHandler);
startElement.addEventListener('click', startHandler);

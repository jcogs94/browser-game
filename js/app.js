// >> OBJECTS <<
let player = {
    name: '',
    hp: 10,
    barracks: []
};

let computer = {
    hp: 10,
    barracks: []
};

let peon = {
    name: '',
    job: 'none'
};

// >> VARIABLES >>
let start = true;
let firstTurn = true;
let playerCreatePeon = false;


// >> ELEMENT CASHE <<
const playerHpElement = document.querySelector('#player-hitpoints');
const computerHpElement = document.querySelector('#computer-hitpoints');
const createPeonElement = document.querySelector('#create-peon');
const selectPeonElement = document.querySelector('#select-peon');
const outputElement = document.querySelector('#output');
const startElement = document.querySelector('#start-button');
const tempElement = document.querySelector('.temp');
let inputBoxElement;
let inputButtonElement;


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

const inputButtonHandler = () => {
    if (start) {
        player.name = inputBoxElement.value;
        
        // On button push during start, grabs 'name' elements and updates value with
        // user input
        let nameElement = document.querySelectorAll('.player-name');
        nameElement.forEach( (element) => element.innerText = player.name);

        inputBoxElement.remove();
        inputButtonElement.remove();

        start = false;

        outputElement.innerHTML = `Welcome ${player.name}!<br><br>You are in your kingdom and you are being invaded by an enemy kingdom. Each turn you can choose to either create a Peon or select one to give it a job. Create your first one now to start the game.`;
    }
    else if (playerCreatePeon) {
        // Creates new peon with the user-input name
        let newPeon = peon;
        newPeon.name = inputBoxElement.value;
        player.barracks.push(newPeon);
    }
};

const startGame = () => {
    addInputAndSubmit();
    outputElement.innerHTML = 'Welcome to Castle Battle!<br><br>What is your name?';
};

const startHandler = () => {
    startElement.remove()
    startGame();
};

const createPeon = () => {
    addInputAndSubmit();
    outputElement.textContent = 'Please name your new Peon:';
    playerCreatePeon = true;
}

const createPeonHandler = () => {
    if (!start) {
        if (firstTurn)
            firstTurn = false;
        
        createPeon();
    }
};

const selectPeonHandler = () => {
    if (!start && !firstTurn) {
        outputElement.textContent = 'You selected a peon!!';
    }
};


// >> EVENT LISTENERS <<
createPeonElement.addEventListener('click', createPeonHandler);
selectPeonElement.addEventListener('click', selectPeonHandler);
startElement.addEventListener('click', startHandler);

// Found from following url:
// https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
document.body.addEventListener( 'click', function ( event ) {
    if( event.target.id === 'inputButton' ) {
        inputBoxElement = document.querySelector('#inputBox');
        inputButtonElement = document.querySelector('#inputButton');
        inputButtonHandler();
    };
  } );

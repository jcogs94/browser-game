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
let newPeon = peon;
let newPeonNamed = false;
let playerTurn = true;


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
        // Allows the user to enter a name and choose the job
        if (!newPeonNamed) {
            // updates name for peon and removes input box and button
            newPeon.name = inputBoxElement.value;
            newPeonNamed = true;
            inputBoxElement.remove();
            inputButtonElement.remove();

            // Temporarily changes button names for peon creation, handlers redirect
            // button input to newPeonAction()
            createPeonElement.innerText = 'Attack';
            selectPeonElement.innerText = 'Repair';

            outputElement.innerHTML = `What should ${newPeon.name} do?<br><br>Attack: -1~4 Enemy HP/turn<br>Repair: +1~4 ${player.name} HP/turn`;
        }
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
};

// Updates new peon action according to button input, pushes
// new peon to player.barracks, and resets button names
const newPeonAction = action => {
    newPeon.job = action;
    player.barracks.push(newPeon);
    
    // reset variables and objects
    newPeon = peon;
    newPeonNamed = false;
    playerCreatePeon = false;
    createPeonElement.innerText = 'Create Peon';
    selectPeonElement.innerText = 'Select Peon';
};

const createPeonHandler = () => {
    if (!start) {
        if (firstTurn)
            firstTurn = false;
        
        // 'Create Peon' button changes to 'Attack', this if statement redirects the
        // 'Attack' click to newPeonAction()
        if (playerCreatePeon && newPeonNamed)
            newPeonAction('attack');
        else
            createPeon();
    }

};

const selectPeonHandler = () => {
    if (!start && !firstTurn) {
        // 'Select Peon' button changes to 'Repair', this if statement redirects the
        // 'Repair' click to newPeonAction()
        if (playerCreatePeon && newPeonNamed)
            newPeonAction('repair');
        else
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

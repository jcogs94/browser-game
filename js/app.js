// >> OBJECTS <<
let player = {
    name: '',
    hp: 10,
    barracks: []
};

let computer = {
    hp: 10,
    barracks: [],
    action: '',
    peonCount: 0,
    peonName() {
        this.peonCount++;
        return ('Peon ' + String(this.peonCount));
    }
};

// >> VARIABLES >>
let start = true;
let firstTurn = true;
let playerCreatePeon = true;
let newPeon = new peon;
let newPeonNamed = false;
let playerTurn = true;
let continueButtonDisplayed = false;
let computerTurnComplete = false;


// >> ELEMENT CASHE <<
const playerHpElement = document.querySelector('#player-hitpoints');
const computerHpElement = document.querySelector('#computer-hitpoints');
const createPeonElement = document.querySelector('#create-peon');
const selectPeonElement = document.querySelector('#select-peon');
const outputElement = document.querySelector('#output');
const startElement = document.querySelector('#start-button');
const tempElement = document.querySelector('.temp');
const playerBarracksElement = document.querySelector('#player-barracks');
const computerBarracksElement = document.querySelector('#computer-barracks');
let inputBoxElement;
let inputButtonElement;


// >> FUNCTIONS <<
function peon (newName, newJob) {
    this.name = newName,
    this.job = newJob
};

// Found at url below:
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addPeonToDisplay = (playerAdded) => {
    if (playerAdded) {
        const playerPeonAdded = document.createElement('p');
        playerPeonAdded.setAttribute('class', 'peon-info');
        playerPeonAdded.innerHTML = `<b>${player.barracks[player.barracks.length - 1].name}:</b> ${player.barracks[player.barracks.length - 1].job}`;
        playerBarracksElement.appendChild(playerPeonAdded);
    }
    else {
        const computerPeonAdded = document.createElement('p');
        computerPeonAdded.setAttribute('class', 'peon-info');
        computerPeonAdded.innerHTML = `<b>${computer.barracks[computer.barracks.length - 1].name}:</b> ${computer.barracks[computer.barracks.length - 1].job}`;
        computerBarracksElement.appendChild(computerPeonAdded);
    }
}

const computerTurn = () => {
    // >>>>>>> TEMP FIXED TO CREATE <<<<<<<<<
    computer.action = 'create';
    // computer.action = Math.random() < 0.5 ? 'create' : 'select';

    if (computer.action === 'create') {
        // comp create peon action
        let compPeonAction = Math.random() < 0.5 ? 'repair' : 'attack';
        newPeon.name = computer.peonName();
        newPeon.job = compPeonAction;
        
        computer.barracks.push(newPeon);
        addPeonToDisplay(false);
        newPeon = new peon;
    }
    else {
        // comp select peon action
    }

    
    playerTurn = true;
    computerTurnComplete = true;
    damageAndEval();
}

const continueButtonHandler = () => {
    if (computerTurnComplete) {
        computerTurnComplete = false;
        
        // Remove continue button and toggle turn
        inputButtonElement.remove();
        continueButtonDisplayed = false;
    }

    // start player/computer's turn
    if (playerTurn)
        outputElement.innerHTML = 'Your turn.<br><br>Create a new Peon or select one to change their job.';
    else {
        computerTurn();
    }
    
}

const damageAndEval = () => {
    let attack = 0;
    let repair = 0;

    // Calculates damage based off whose turn it is
    if (!playerTurn) {
        player.barracks.forEach((fighter) => {
            if (fighter.job === 'attack')
                attack += getRandomInt(1, 4);
            else if (fighter.job === 'repair')
                repair += getRandomInt(1, 4);
        })

        player.hp += repair;
        computer.hp -= attack;
    }
    else {
        computer.barracks.forEach((fighter) => {
            if (fighter.job === 'attack')
                attack += getRandomInt(1, 4);
            else if (fighter.job === 'repair')
                repair += getRandomInt(1, 4);
        })

        computer.hp += repair;
        player.hp -= attack;
    }

    // Determines if anyone has died, else continues game
    if (player.hp <= 0) {
        // player lost
        console.log('Player lost');
    }
    else if (computer.hp <= 0) {
        // player won
        console.log('Player won');
    }
    else {
        // Updates player and computer health in the HTML
        // Found from url below:
        // https://stackoverflow.com/questions/4784568/set-content-of-html-span-with-javascript
        while( playerHpElement.firstChild ) {
            playerHpElement.removeChild( playerHpElement.firstChild );
        }
        playerHpElement.appendChild( document.createTextNode(player.hp) );
        // Same as above
        while( computerHpElement.firstChild ) {
            computerHpElement.removeChild( computerHpElement.firstChild );
        }
        computerHpElement.appendChild( document.createTextNode(computer.hp) );

        if (!playerTurn) {
            // Display result of player's turn
            outputElement.innerHTML = `End of ${player.name}'s Turn:<br><br>${player.name} attacked for ${attack} damage.<br>${player.name} repaired for ${repair} health.`;
        }
        else {
            // Display result of computer's turn
            outputElement.innerHTML = `Computer's Turn:<br>The computer decided to ${computer.action} a Peon.<br><br>Computer attacked for ${attack} damage.<br>Computer repaired for ${repair} health.`;
        }
        
        // Creates new 'Continue' button to continue when player is ready
        if (!computerTurnComplete) {
            const newButton = document.createElement('button');
            newButton.setAttribute('id', 'continueButton');
            newButton.innerText = 'Continue';
            tempElement.appendChild(newButton);
            continueButtonDisplayed = true;
        }
        
    }
}

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

        outputElement.innerHTML = `Welcome ${player.name}!<br><br>You are in your kingdom and you are being invaded by an enemy kingdom. Each turn you can choose to either create a Peon or select one to change its job. Create your first one now to start the game.`;
    }
    else if (playerCreatePeon) {
        // Allows the user to enter a name and choose the job
        if (!newPeonNamed) {
            // updates name for peon and removes input box and button
            newPeonNamed = true;
            newPeon.name = inputBoxElement.value;
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
    addPeonToDisplay(true);
    
    // reset variables and objects
    newPeon = new peon;
    newPeonNamed = false;
    playerCreatePeon = false;
    createPeonElement.innerText = 'Create Peon';
    selectPeonElement.innerText = 'Select Peon';
    damageAndEval();
};

// >>>>>>>>>> SELECT <<<<<<<<<<<
const selectPeon = () => {
    damageAndEval();
}

const createPeonHandler = () => {
    if (!start) {
        // 'Create Peon' button changes to 'Attack', this if statement redirects the
        // 'Attack' click to newPeonAction()
        if (playerCreatePeon && newPeonNamed)
            newPeonAction('attack');
        else if (!continueButtonDisplayed && playerTurn) {
            if (firstTurn)
                firstTurn = false;
            playerTurn = false;
            createPeon();
        }
    }
};

const selectPeonHandler = () => {
    if (!start && !firstTurn) {
        // else if will cause bug using "!continueButtonDisplayed"

        // 'Select Peon' button changes to 'Repair', this if statement redirects the
        // 'Repair' click to newPeonAction()
        if (playerCreatePeon && newPeonNamed)
            newPeonAction('repair');
        else if (!playerCreatePeon && !continueButtonDisplayed) {
            playerTurn = false;
            selectPeon();
        }
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

document.body.addEventListener( 'click', function ( event ) {
    if( event.target.id === 'continueButton' ) {
        inputButtonElement = document.querySelector('#continueButton');
        continueButtonHandler();
    };
} );

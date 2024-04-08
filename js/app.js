// >> OBJECTS <<
let player = {
    name: '',
    hp: 10,
    barracks: []
};

let computer = {
    hp: 10,
    barracks: [],
    compFirstTurn: true,
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
let playerSelection = false;
let gameOver = false;


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
let changePeonElement;


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
        playerPeonAdded.setAttribute('id', `${player.barracks[player.barracks.length - 1].name}`);
        playerPeonAdded.innerHTML = `<b>${player.barracks[player.barracks.length - 1].name}:</b> ${player.barracks[player.barracks.length - 1].job}`;
        playerBarracksElement.appendChild(playerPeonAdded);
    }
    else {
        const computerPeonAdded = document.createElement('p');
        computerPeonAdded.setAttribute('class', 'peon-info');
        computerPeonAdded.setAttribute('id', `peon-${computer.peonCount}`);
        computerPeonAdded.innerHTML = `<b>${computer.barracks[computer.barracks.length - 1].name}:</b> ${computer.barracks[computer.barracks.length - 1].job}`;
        computerBarracksElement.appendChild(computerPeonAdded);
    }
}

const computerTurn = () => {
    if (computer.compFirstTurn === true) {
        computer.action = 'create';
        computer.compFirstTurn = false;
    }
    else
        computer.action = Math.random() < 0.5 ? 'create' : 'select';

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
        // Randomly assigns index to change
        let index = getRandomInt(0, computer.barracks.length - 1);

        // Makes change
        if (computer.barracks[index].job === 'repair')
            computer.barracks[index].job = 'attack';
        else if (computer.barracks[index].job === 'attack')
            computer.barracks[index].job = 'repair';

        // Updates barracks screen
        changePeonElement = document.querySelector(`#peon-${index + 1}`);
        changePeonElement.innerHTML = `<b>${computer.barracks[index].name}:</b> ${computer.barracks[index].job}`;
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
    else if (!gameOver) {
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

    // Ensures negative health is not displayed
    if (player.hp < 0)
        player.hp = 0;
    if (computer.hp < 0)
        computer.hp = 0;

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
    
    // Determines if anyone has died, else continues game
    if (player.hp <= 0) {
        // player lost
        outputElement.innerHTML = `Oh no!<br><br>You lost!!`
        gameOver = true;
        createPeonElement.remove();
        selectPeonElement.remove();
        tempElement.remove();
    }
    else if (computer.hp <= 0) {
        // player won
        outputElement.innerHTML = `Congrats!<br><br>You won!!`
        gameOver = true;
        createPeonElement.remove();
        selectPeonElement.remove();
        tempElement.remove();
    }
    else {
        if (!playerTurn) {
            // Display result of player's turn
            outputElement.innerHTML = `End of ${player.name}'s Turn:<br><br>${player.name} attacked for ${attack} damage.<br>${player.name} repaired for ${repair} health.`;
        }
        else {
            // Display result of computer's turn
            outputElement.innerHTML = `Computer's Turn:<br>The computer decided to ${computer.action} a Peon.<br><br>Computer attacked for ${attack} damage.<br>Computer repaired for ${repair} health.`;
        }
        
        // Creates new 'Continue' button to continue when player is ready
        if (!computerTurnComplete && !gameOver) {
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
    else if (playerSelection === true) {
        let validInput = false;

        // Iterates over player barracks to see if that named peon exists
        player.barracks.forEach( fighter => {
            if (inputBoxElement.value == fighter.name) {
                // valid input, update peon
                validInput = true;
                playerSelection = false;
                if (fighter.job === 'attack')
                    fighter.job = 'repair';
                else
                    fighter.job = 'attack';

                // Update player barracks with job change
                changePeonElement = document.querySelector(`#${inputBoxElement.value}`);
                changePeonElement.innerHTML = `<b>${fighter.name}:</b> ${fighter.job}`;

                // Remove input box and button, evaluate end of turn
                inputBoxElement.remove();
                inputButtonElement.remove();
                damageAndEval();
            }
        });

        // Displays error if invalid input and clears box
        if (validInput === false) {
            outputElement.innerHTML = `Invalid name entered.<br><br>Please enter the name of the peon you would like to change the job of.`;
            inputBoxElement.value = '';
        }
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
    outputElement.innerHTML = `Please enter the name of the peon you would like to change the job of.`;
    addInputAndSubmit();
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
        // 'Select Peon' button changes to 'Repair', this if statement redirects the
        // 'Repair' click to newPeonAction()
        if (playerCreatePeon && newPeonNamed)
            newPeonAction('repair');
        else if (!playerCreatePeon && !continueButtonDisplayed) {
            playerTurn = false;
            playerSelection = true;
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
// Same as above
document.body.addEventListener( 'click', function ( event ) {
    if( event.target.id === 'continueButton' ) {
        inputButtonElement = document.querySelector('#continueButton');
        continueButtonHandler();
    };
} );

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


// >> FUNCTIONS <<
const createPeonHandler = () => {
    
}

const selectPeonHandler = () => {
    
}


// >> EVENT LISTENERS <<
createPeonElement.addEventListener('click', createPeonHandler);
selectPeonElement.addEventListener('click', selectPeonHandler);

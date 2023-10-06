/* let title = document.querySelector('h1');
title.innerHTML = 'Guess a number game!'; */

/* let paragraph = document.querySelector('p');
paragraph.innerHTML = 'Choose a number between 1 and 10.'; */
let listOfNumbersDrawn = [];
let limitNumber = 100;
let secretNumber = generateRandomNumber();
let attempts = 1;

function displaytTextOnScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Female', { rate: 1.1 });
}

function translateText(id, text) {
    let field = document.getElementById(id);
    field.innerHTML = text;
}

translateText('restart', 'New Game');
translateText('guess', 'Guess');

function displayStartMessage() {
    displaytTextOnScreen('h1', 'Guess a number game!');
    displaytTextOnScreen('p', 'Choose a number between 1 and 100.');
}

displayStartMessage();

function checkGuess() {
    let guess = document.querySelector('input').value;

    if (guess == secretNumber) {
        displaytTextOnScreen('h1', 'You got it!');
        let attemptWord = attempts > 1 ? 'attempts' : 'attempt';
        let messageAttempts = `You've found the secret number with ${attempts} ${attemptWord}!`;
        displaytTextOnScreen('p', messageAttempts);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            displaytTextOnScreen('p', 'The secret number is smaller!');
        } else {
            displaytTextOnScreen('p', 'The secret number is bigger!');
        }
        attempts++;
        cleanField();
    }
}

function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * limitNumber + 1);
    let quantityOfElementsInTheList = listOfNumbersDrawn.length;

    if (quantityOfElementsInTheList == limitNumber) {
        listOfNumbersDrawn = [];
    }

    if (listOfNumbersDrawn.includes(chosenNumber)) {
        return generateRandomNumber();
    } else {
        listOfNumbersDrawn.push(chosenNumber);
        console.log(listOfNumbersDrawn);
        return chosenNumber;
    }
}

function cleanField() {
    guess = document.querySelector('input');
    guess.value = '';
}

function restartGame() {
    secretNumber = generateRandomNumber();
    cleanField();
    attempts = 1;
    displayStartMessage();
    document.getElementById('restart').setAttribute('disabled', true);
}

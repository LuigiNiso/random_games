function toggleActiveRed(element) {
    
    // Find the currently active element
    const activeElement = document.querySelector('.sum#activeRed');

    // If there's an active element and it's not the clicked element, remove its active state
    if (activeElement && activeElement !== element) {
        activeElement.removeAttribute('id');
    }

    // Toggle the clicked element's active state
    if (element.id === 'activeRed') {
        element.removeAttribute('id');
    } else {
        element.id = 'activeRed';
    }
}

function toggleActiveBlue(element) {
    // Find the currently active element
    const activeElement = document.querySelector('.sum#activeBlue');

    // If there's an active element and it's not the clicked element, remove its active state
    if (activeElement && activeElement !== element) {
        activeElement.removeAttribute('id');
    }

    // Toggle the clicked element's active state
    if (element.id === 'activeBlue') {
        element.removeAttribute('id');
    } else {
        element.id = 'activeBlue';
    }
}

let rollsound1 = new Audio("./dice-roll-sound.mp3");
let rollsound2 = new Audio("./dice-roll-sound.mp3");
let rollsound3 = new Audio("./dice-roll-sound.mp3");

function rollDice() {
    const dice = document.querySelectorAll('.dice img');
    const rollingTime = 200; // total rolling time in milliseconds
    const rollIntervalTime = 10; // interval time between changes

    let finalRolls = []; // Array to store the final rolls

    dice.forEach((die) => {
        // Play sounds (as you've implemented)
        rollsound1.pause();
        rollsound2.pause();
        rollsound3.pause();

        rollsound1.currentTime = 0;
        rollsound2.currentTime = 0;
        rollsound3.currentTime = 0;
        rollsound1.play();
        setTimeout(() => {
            rollsound2.play();
        }, 50);
        setTimeout(() => {
            rollsound3.play();
        }, 100);
        
        die.style.filter = "brightness(0.6)"; // Apply brightness filter during the roll
        let rollCount = 0; // to count the number of changes

        // Use setInterval to simulate rolling
        const rollInterval = setInterval(() => {
            const randomRoll = Math.floor(Math.random() * 6) + 1;
            die.src = `images/${randomRoll}.png`;

            rollCount++;

            // Stop the rolling after the specified rolling time
            if (rollCount * rollIntervalTime >= rollingTime) {
                clearInterval(rollInterval);

                // Stabilize on a final random value
                const finalRoll = Math.floor(Math.random() * 6) + 1;
                die.src = `images/${finalRoll}.png`;
                
                // Store the final roll
                finalRolls.push(finalRoll);

                // Remove the brightness filter after the roll is done
                die.style.filter = ""; // Reset filter to original state

                // Check if all dice have rolled
                if (finalRolls.length === dice.length) {
                    displayDiceSum(finalRolls); // Call function to display the sum
                }
            }
        }, rollIntervalTime);
    });
}

const pointsMapping = {
    18: 20,
    17: 15,
    16: 10,
    15: 7,
    14: 5,
    13: 3,
    12: 2,
    11: 1,
    10: 1,
    9: 2,
    8: 3,
    7: 5,
    6: 7,
    5: 10,
    4: 15,
    3: 20
};

let totalRed = 0;
let totalBlue = 0;

// Initialize totals display
document.querySelector('.totalRed').innerHTML = totalRed;
document.querySelector('.totalBlue').innerHTML = totalBlue;

function displayDiceSum(rolls) {
    const sum = rolls.reduce((total, num) => total + num, 0); // Calculate the sum
    console.log("Total sum of dice:", sum); // Display the sum in the console or update the UI

    // Update the UI with the dice sum
    document.querySelector('.diceSum').innerText = sum; 

    // Get active selections
    const activeRedElement = document.querySelector('#activeRed');
    const activeBlueElement = document.querySelector('#activeBlue');

    console.log(activeRedElement.querySelector('.value').innerText);
    // Check for active red choice
    if (activeRedElement) {
        
        const redChoiceValue = parseInt(activeRedElement.querySelector('.value').innerText);
        if (redChoiceValue === sum) {
            totalRed += pointsMapping[redChoiceValue];
            console.log("Red won!");
        }
    }

    // Check for active blue choice
    if (activeBlueElement) {
        const blueChoiceValue = parseInt(activeBlueElement.querySelector('.value').innerText);
        if (blueChoiceValue === sum) {
            totalBlue += pointsMapping[blueChoiceValue];
            console.log("Blue won!");
        }
    }

    // Update total displays
    document.querySelector('.totalRed').innerHTML = totalRed;
    document.querySelector('.totalBlue').innerHTML = totalBlue;
}

// Event listener for keyboard input
document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
        rollDice();
    } 
});

function update() {
    console.log("suca");
    
    totalRed = parseInt( document.querySelector(".totalRed").innerHTML);
    totalBlue = parseInt( document.querySelector(".totalBlue").innerHTML);
}

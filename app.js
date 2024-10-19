let extract = document.querySelector(".estrazione button");
let rng_dix = document.querySelector(".estrazione .numero");
let redteam = document.querySelector("#numerorosso");
let blueteam = document.querySelector("#numeroblu");
let bpoints = document.querySelector(".bluep");
let rpoints = document.querySelector(".redp");

let rollsound = new Audio("./dice-roll-sound.mp3");

let bluepoints = 0;
let redpoints = 0;

extract.addEventListener("click", ()=>{
    console.log(roll());
    
});

document.addEventListener("keydown", (e)=>{
    if(e.key== " " || e.key =="Enter"){
        blueteam.blur();
        redteam.blur();
        roll()
    }
})


function roll() {
    rollsound.pause()
    rollsound.currentTime = 0;
    rollsound.play();
    let animationInterval = setInterval(() => {
        let tempRandom = Math.floor(Math.random() * 100);
        rng_dix.innerHTML = tempRandom;
    }, 10);

    setTimeout(() => {
        clearInterval(animationInterval);
        let finalRandom = Math.floor(Math.random() * 100); 
        rng_dix.innerHTML = finalRandom;

        let redDis = Math.abs(finalRandom - redteam.value);
        let blueDis = Math.abs(finalRandom - blueteam.value);

        console.log(`Final Random: ${finalRandom}`);
        console.log(`Red Team Distance: ${redDis}`);
        console.log(`Blue Team Distance: ${blueDis}`);

        // You can handle the comparison here
        if (blueDis > redDis) {
            
            if( redDis == 0){
                redpoints += 2;
            }else{
                redpoints += 1;
            }
            rpoints.innerHTML = redpoints;
            console.log("Red team wins!");
        } else if (blueDis < redDis) {
            console.log("Blue team wins!");
            if(blueDis == 0){
                bluepoints += 2;
            }else{
                bluepoints += 1;
            }
            bpoints.innerHTML = bluepoints;
        } else {
            console.log("It's a tie!");
        }
    }, 200);
}


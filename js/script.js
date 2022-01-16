let playerName;
let computerName;

const femaleMage = "./image/fe-mage.png";
const maleMage = "./image/male-mage.png";

let playerAttack;

let playerRemainingLife = 5;
let computerRemainingLife = 5;

const attackChoices = ["fire","grass","water"];
const attackColor = ["#d98935","#60a741","#26f3f7"];

function getPlayerData(){

    callFormsMenu(false);

    const form  = document.getElementById('form-info');

    form.addEventListener('submit', () => {
        playerName = form.elements["playerName"].value;
        computerName = form.elements["computerName"].value;
        let gender = form.elements["gender"].value;

        if (!playerName)
            playerName = "Senior mage";
        if (!computerName)
            computerName = "Lich King";
        
        setMageImage(gender);      

        callFormsMenu(true);
        
        score();

    });
}

function setMageImage(gender){
 
    if (gender == "0")
        document.querySelector("#player-image img").src = femaleMage;
    else
        document.querySelector("#player-image img").src = maleMage;
}

function buttonListenner(addListenner) {

    const buttons = document.querySelectorAll('.attack-buttons');

    if (addListenner){
        buttons.forEach((button) => {    
            button.addEventListener('click', executeRound);
        });
    }
    else {
        buttons.forEach((button) => {    
            button.removeEventListener('click', executeRound);
        });
    }
}

function executeRound(event){

    playerAttack = attackChoices.indexOf(event.target.id);
    
    roundFight(playerAttack, computerPlay());

    if (playerRemainingLife === 0 || computerRemainingLife === 0)
        battleEnd();

    score();
}

function computerPlay(){

    return Math.floor(Math.random()*3); //randomly choose a number between 0 and 2 

}

function score(){

    playerLifeBox = document.querySelector("#player");
    computerLifeBox = document.querySelector("#computer");
    
    playerLifeBox.textContent = `${playerName}\nLife: ${playerRemainingLife}`;
    computerLifeBox.textContent = `${computerName}\nLife: ${computerRemainingLife}`;
}

function roundFight(playerAttack, computerAttack){

    if((playerAttack < computerAttack) && !(playerAttack === 0 && computerAttack === 2) || (playerAttack === 2 && computerAttack === 0)){
        computerRemainingLife-=1;
        resultFight(playerAttack, computerAttack, "won");
    }
    else if (playerAttack === computerAttack){
        resultFight(playerAttack, computerAttack, "tied");
    }
    else{
        playerRemainingLife-=1;
        resultFight(playerAttack, computerAttack, "lost");
    }
}

function resultFight(playerAttack, computerAttack, result){

    resultText = `You used a <span id="playerAttackType">${attackChoices[playerAttack]}</span> attack against a <span id="computerAttackType">${attackChoices[computerAttack]}</span> attack.`;
    resultBox = document.querySelector(".result");
    resultBox.innerHTML = resultText;


    playerAttackBox = document.querySelector("#playerAttackType");
    computerAttackBox = document.querySelector("#computerAttackType");

    playerAttackBox.style.color = attackColor[playerAttack];
    computerAttackBox.style.color = attackColor[computerAttack];

    battleResultBox = document.querySelector(".resultFinal");
    battleResultBox.textContent = `You ${result}!`;
}

function callFormsMenu(hideMenu){
 
    if (hideMenu){
        // hides the menu and forms 
        document.querySelector(".menu").style.zIndex = "-1";        
        document.querySelector(".menu").style.display = "none";
        document.querySelector("#input-player-info").style.display = "none";
        document.querySelector("#page-mask").style.display = "none";
    } else {
        // bring the menu and forms 
        document.querySelector(".menu").style.zIndex = "2";        
        document.querySelector(".menu").style.display = "flex";
        document.querySelector("#input-player-info").style.display = "flex";
        document.querySelector("#page-mask").style.display = "block";        
    }
}

function callTryAgainMenu(whichMenu){

    // brings the menu and play again button 
    document.querySelector("#page-mask").style.display = "block";
    document.querySelector(".menu").style.zIndex = "2";
    document.querySelector(".menu").style.display = "flex";        
    document.querySelector("#try-again-container").style.display = "flex";

    setTimeout(() => document.querySelector("#try-again").addEventListener("click", () => location.reload()), 0); /* ran function after everything is ran/updated */
}

function battleEnd(){
    
    if (playerRemainingLife === 0){
        resultBox.textContent = "You lost some battles and the war!"; 
        document.querySelector("#try-again-label").textContent = "You lost!";
        battleResultBox.textContent = "LOSER!";
    } else {
        resultBox.textContent = " Even though you lost some battles, in the end you won the war!";
        document.querySelector("#try-again-label").textContent = "You Won!";
        battleResultBox.textContent = "WINNER!";
    }
    buttonListenner(false);
    setTimeout(() => callTryAgainMenu(), 2000); // call try again menu after 2s
    
}

document.addEventListener('DOMContentLoaded', () => {

    getPlayerData();
    buttonListenner(true);

}, false);
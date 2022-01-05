let playerName;
let computerName;

let playerAttack;

let playerRemainingLife = 5;
let computerRemainingLife = 5;

const attackChoices = ["fire","grass","water"];
const attackColor = ["#d98935","#60a741","#26f3f7"];

let resultText;

function getPlayerData(){
    getPlayerData = function(){}; /* run only once */
    setTimeout(() =>  playerName = window.prompt("Enter your name: ","Senior Mage"), 0); 
    setTimeout(() =>  computerName = window.prompt("Enter enemy's name: ","Lich King"), 0); 
    if (playerName === null) 
        playerName = "Senior Mage";
    if (computerName === null) 
        computerName = "Lich King";
    score();
}

function getButtonID() {
    const buttons = document.querySelectorAll('.attack-buttons');

    buttons.forEach((button) => {    
        button.addEventListener('click', (event) => {
            playerAttack = attackChoices.indexOf(event.target.id);
            game();
        });
    });
}

function game(){
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

function battleEnd(){
    if (playerRemainingLife === 0){
        resultText = "You lost some battles and the war!";
        resultBox.textContent = resultText;
        battleResultBox.textContent = `LOSER`;
    } else {
        resultText = "Even though you lost some battles, in the end you won the war!";
        resultBox.textContent = resultText;
        battleResultBox.textContent = `WINNER`;
    }
    setTimeout(() => alert("The page will reset!"), 0); /* call the alert after everything is ran/updated */
    location.reload();
}

window.onload=function(){
    getPlayerData();
    getButtonID();
}
let attackChoices = ["fire","grass","water"];
let yourLife;
let enemyLife;
let playerInput;

function computerPlay(){
    return Math.floor(Math.random()*3); //randomly choose a number between 0 and 2 
}

function playerPlay(){
    playerInput = prompt("Choose your attack [Fire, Grass, Water]:","");
    if (playerInput === null || attackChoices.indexOf(playerInput.toLowerCase()) === -1){ 
        // indexOf returns -1 if the word is not present in the array
        console.log("Input invalid!");
        playerPlay();
    }
    return attackChoices.indexOf(playerInput.toLowerCase());
}

function roundFight(playerAttack, computerAttack){
    if((playerAttack < computerAttack) && !(playerAttack === 0 && computerAttack === 2) || (playerAttack === 2 && computerAttack === 0)){
        enemyLife-=1;
        return `You used a ${attackChoices[playerAttack]} attack against a ${attackChoices[computerAttack]} attack, you won!`;
    }
    else if (playerAttack === computerAttack){
        return `You used a ${attackChoices[playerAttack]} attack against a ${attackChoices[computerAttack]} attack, you tied!`;
    }
    else{
        yourLife-=1;
        return `You used a ${attackChoices[playerAttack]} attack against a ${attackChoices[computerAttack]} attack, you lost!`;
    }
}

function game(){
    yourLife = 5;
    enemyLife = 5;
    while(yourLife > 0 && enemyLife > 0){
        console.log(roundFight(playerPlay(),computerPlay()));
        console.log(`Your life: ${yourLife}\nEnemy's life: ${enemyLife}`);
    }
    if (yourLife === 0){
        console.log("You lost the battles and the war!");
    }else {
        console.log("Even though you lost some battles, in the end you won the war!");
    }
}
function computerPlay(){
    let randomIndex = Math.floor(Math.random()*3); //randomly choose a number between 0 and 2
    let attackChoices = ["Fire","Grass","Water"];
    return attackChoices[randomIndex]; 
}
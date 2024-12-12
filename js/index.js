// Game constants and variables
let inputDir = {x:0,y:0};
let score = 0 ; 
let speed = 5 ; 
let lastPaintTime = 0 ; 

let snakeArr = [ {x:13,y:15} ] // This is the "snake" character that is moving in the game board
food = {x : 6 , y : 7};

// Audio sound initialization 

const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');

/* Game functions  */ 

// Game loop --> A function that keeps on repainting the window 

function main(ctime){

    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return; 
    }
    lastPaintTime = ctime;
    gameEngine();
}

/*
 * isCollide() function returns true when two things happen : 
 *  1) Snake hits or eats itself
 *  2) Snake hits the walls of the board
 * 
 * Here , snakeArr[0] represents the head of the snake with the x and y coordinates it 
 * is in currently.
 */


function isCollide(snake){
    // If you bump into yourself --> if coords of snake head is equal to any segment in the body 

    for(let i = 1 ; i < snakeArr.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true;
        }
    }
    // If you bump into wall --> If snake head coordinates are within coord range of the wall 

    if(snake[0].x >= 18 || snake[0].x<=0 || snake[0].y >= 18 || snake[0].y <= 0  ){
        return true;
    }
}

function gameEngine(){

    // Part 1 : Updating the snake array and food
    
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over . Press any key to play again!");
        snakeArr = [{x:13,y:15}];
        musicSound.play();
        score = 0 ; 
    }

    // If snake has eaten the food , increment the score and regenrate the food 

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            HighScore.innerHTML = "HiScore : "+highscoreval;
        }
        document.getElementById('score').innerHTML = "Score : " + score ;

        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2 ; 
        let b = 16 ; 
        food = {x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())};
    }

    // Moving the snake 

    for(let i = snakeArr.length - 2 ; i>=0 ; i--){
        
        snakeArr[i+1] = {...snakeArr[i]};

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    
    
    
    // Part 2 : Display the snake and food

        // Display the snake

    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y ; 
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0 ){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
            }
        board.appendChild(snakeElement);
    })

        // Display the food 

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y ; 
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}







// Main logic starts from here


let highscore = localStorage.getItem("highscore");
if(highscore === null){
    let highscoreval = 0 
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval = JSON.parse(highscore);
    HighScore.innerHTML="HighScore : " + highscore ; 
}


// Game execution starts from here :

window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1}; 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow Up");
            inputDir.x = 0 ; 
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x = 0; 
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("Arrow Left");
            inputDir.x = -1; 
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("Arrow Right");
            inputDir.x = 1; 
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
});
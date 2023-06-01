// Getting Elements
let startButton = document.getElementById("startGameBtn");
let initialScreen = document.getElementById("initialScreen");
let board = document.getElementById("board")
let secondScreen = document.querySelector("main");
let time = document.getElementById("time");
let pairs = document.getElementById("pairsFound");
let images = Array.from(document.querySelectorAll(".img"));
let imagesCovers = Array.from(document.querySelectorAll(".cover"));
let test = document.getElementById("timeTitle")

//Global Scope
let seconds = 0; 
let timer; 


//Create Start Game Function
startButton.addEventListener("click", () => {
    initialScreen.style.display = "none";
    secondScreen.style.display = "flex";
    pairs.value = 0;
    startTime()
    setSrc()
})


//Setting Random location for each picture. 

//TODO: Search a better way than duplicate pictures in folder. 
function setSrc() {
    let previuousIndex = [];
    
    for(let i = 0; i <= 100; i++)
    {
        let randomSrc = Math.floor(Math.random() * 20) + 1;
        
        if(!previuousIndex.includes(randomSrc))
        {
            previuousIndex.push(randomSrc)
            console.log(previuousIndex)
        }
        
        if(previuousIndex.length === 20){
            break;
        }
    }
    for(let i = 0; i < 20; i++)
    {
        images[i].src = `src/images/picture${previuousIndex[i]}.png`
        images[i].style.display = "none"; 

    }
}

//TODO: Create Stopwatch 
function startTime()
{
    timer = setInterval(() => {
        seconds++
        time.value = formatTime(seconds);
    }, 1000);
}

function formatTime(sec)
{
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    seconds = sec - (hours * 3600) - (minutes * 60); 

    //Adding 0 if it's less than 10; 
    if(hours < 10) { hours = `0${hours}`}
    if(minutes < 10) { minutes = `0${minutes}`}
    if(seconds < 10) { seconds =`0${seconds}`}

    return `${hours} : ${minutes} : ${seconds}`

}

//Reveling Cards
for(let i = 0; i < imagesCovers.length; i++)
{
    imagesCovers[i].addEventListener('click', ()=> {
        imagesCovers[i].style.display = "none"; 
        images[i].style.display = "block";
        checkCard()
    })
}

//Check if Carts are same
function checkCard(image, image2)
{ 
    if()
}
//TODO: Create A function to reset game, so, reset timer, counter and call setSrc(); 
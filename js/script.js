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
let checkImageArray = [];
let checkCoverArray = [];


//Create Start Game Function
startButton.addEventListener("click", () => {
    initialScreen.style.display = "none";
    secondScreen.style.display = "flex";
    pairs.value = 0;
    startTime()
    setSrc()
})


//Setting Random location for each picture. 

//TODO: Search a better way than duplicate pictures in folder. You're getting always the same sequence
function setSrc() {
    let previuousIndex = [];
    let previousPosition = []
    
    for(let i = 0; i <= 100; i++)
    {
        let randomSrc = Math.floor(Math.random() * 10) + 1;
        
        if(!previuousIndex.includes(randomSrc))
        {
            previuousIndex.push(randomSrc)
        }
        
        if(previuousIndex.length === 10){
            break;
        }
        
        
    }

    for(let i = 0; i <= 100; i++){

        let randonPosition = Math.floor(Math.random() * 20);
        if(!previousPosition.includes(randonPosition))
        {
            previousPosition.push(randonPosition)
        }
        
        if(previousPosition.length === 20){
            break;
        }
    }

    let incrementor = 0; 
    let secondIncrementor = 0; 

    for(let i = 0; i < 20; i++)
    {
        
        if(incrementor >= 10)
        { 
            images[previousPosition[i]].src = `src/images/picture${previuousIndex[secondIncrementor]}.png`
            secondIncrementor++

        }

        if(incrementor < 10)
        {
            images[previousPosition[i]].src = `src/images/picture${previuousIndex[incrementor]}.png`
            incrementor++
        }

        images[previousPosition[i]].style.display = "none"; 


        
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
        checkCard(images[i], imagesCovers[i])
        console.log(images[i] + " " + imagesCovers[i])
    })
}

//Check if Carts are same
function checkCard(image, cover)
{ 

    if(checkImageArray.length < 2)
    { 
        checkImageArray.push(image)
        checkCoverArray.push(cover) 
    }
    if(checkImageArray[0].src === undefined || checkImageArray[1].src === undefined)
    {
        console.log("To no Undefined")
    }
    if(checkImageArray[0].src === checkImageArray[1].src)
    {
        console.log("You Win")
    }
    else
    {
        setInterval(returnCard,2000)
    }
}

function returnCard()
{
    checkImageArray[0].style.display = "none"
    checkCoverArray[0].style.display = "block"
    checkArray[1].style.display = "none"
    checkCoverArray[1].style.display = "block"

}
//TODO: Create A function to reset game, so, reset timer, counter and call setSrc(); 
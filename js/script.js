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
let resetBtn = document.getElementById("resetGameBtn")

//Global Scope
let interval;
let timer = 0;
let checkImageArray = [];
let checkCoverArray = [];
let pairsFound = 0;


//Create Start Game Function
startButton.addEventListener("click", () => {
    initialScreen.style.display = "none";
    secondScreen.style.display = "flex";
    pairs.value = pairsFound;
    startTimer()
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
function startTimer() {
    interval = setInterval(function() {
        timer++;
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        time.value = formatTime(minutes) + ":" + formatTime(seconds);
    }, 1000);
}

function formatTime(num) {
    return num < 10 ? '0' + num : num;
}

//Reveling Cards
for(let i = 0; i < imagesCovers.length; i++)
{
    imagesCovers[i].addEventListener('click', ()=> {
        imagesCovers[i].style.display = "none"; 
        images[i].style.display = "block";
        checkCard(images[i], imagesCovers[i])
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
    if(checkImageArray.length === 2 && checkCoverArray.length === 2)
    {
        if(checkImageArray[0].src === checkImageArray[1].src)
        {
            pairsFound++
            pairs.value = pairsFound;
            checkCoverArray = []
            checkImageArray = []

            winner()    
        }
        else
        {
            setTimeout(returnCard,1000)
            setTimeOut(function() {
                if (isBlocked) {
                    unblockScreen();
                } else {
                    blockScreen();
                }
                // Toggle the isBlocked flag
                isBlocked = !isBlocked;
            }, 1005);
            
        }
    }
}

function blockScreen() {
    document.getElementById('blocker').style.display = 'block';
}

function unblockScreen() {
    document.getElementById('blocker').style.display = 'none';
}

function returnCard()
{
    checkImageArray[0].style.display = "none"
    checkCoverArray[0].style.display = "block"
    
    checkImageArray[1].style.display = "none"
    checkCoverArray[1].style.display = "block"

    checkCoverArray = []
    checkImageArray = []
}

function winner()
{
    if(pairsFound === 10)
    {
        alert("You Won!")
        resetGame(); 
    }
}
//TODO: Create A function to reset game, so, reset timer, counter and call setSrc(); 
resetBtn.addEventListener('click', resetGame)
function resetGame(){
    timer = 0; 
    pairsFound = 0;
    pairs.value = pairsFound;


    for(let image of images)
    {
        image.style.display = "none"
    }

    for(let cover of imagesCovers)
    {
        cover.style.display = "block"
    }
}

winner()
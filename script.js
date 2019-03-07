const startButton = document.querySelector('#start-button')
let timerSpan = document.querySelector('#timer')
let resultMessage = document.getElementById('result')
const levelOne = document.querySelector('#level-1')
const playAgainBtn = document.querySelector('#replay-button')
let allPopped = document.querySelectorAll('.popped')
let allPimples = document.querySelectorAll('.pimple')
let max = 10;
let currentMax 
let timeCount = 15
let currentTimeCount 
let active = true
let win = false

function gameInit(){
    console.log('gameInit is running')
    levelOne.style.display = 'block'
    playAgainBtn.style.display = 'none'
    manyPimples()
}

startButton.addEventListener('click', function () {
    startTimer(timeCount)
    console.log('startTimer is running')
})

function startTimer(seconds) {
    currentTimeCount = timeCount 
    let timer = setInterval(function () {
        console.log(`${seconds} is running`)
        console.log(`${timeCount} is running`)
        seconds -= 1
        currentTimeCount -= 1
        if (seconds === 0) {
            active = false
            checkWinLose()
        }

        if (seconds.toString().length === 1) {
            seconds = "0" + seconds
        }
        if(win === true){
            console.log('stops timer')
            clearInterval(timer)
        }
        timerSpan.innerText = "00:" + seconds
    }, 1000);
    setTimeout(function () {
        clearInterval(timer)
    }, (seconds * 1000))

}

const createPimple = function () {
    let newPimple = document.createElement('div')
    newPimple.setAttribute('class', 'pimple')
    document.body.appendChild(newPimple)
    newPimple.style.top = (Math.random() * window.innerHeight) + "px"
    newPimple.style.left = (Math.random() * window.innerWidth) + "px"
    console.log(`${max} pimples created`)
    // max = 10
    // timeCount = 15
    active = true
    win = false

    newPimple.addEventListener('click', popPimple = e => {
        newPimple.classList.add('popped')
        setTimeout(() => {
            newPimple.style.display = "none"
            currentMax -=1
            document.body.removeChild(newPimple);
            console.log(`${currentMax} pimples left`)
            if (currentMax === 0 && active) {
                youWon()
            }
        }, 1000)
    })
}


let manyPimples = function(){
    currentMax = max
    console.log('many pimples is running')
    for (let i = 0; i < max; i++) {
        createPimple()
    }
}

function checkWinLose() {
    console.log('checkWinLose is running')
    if (currentMax > 0 && currentTimeCount === 0) {
        console.log('test')
        youLose()
    } gameRestart()
}

function stopTimer(){
    clearInterval(startTimer)
}

function youWon() {
    win = true
    resultMessage.innerHTML = 'You won!'
    gameRestart()
    console.log('you won is running')
}

function youLose() {
    stopTimer()
    resultMessage.innerHTML = 'Out of time'
    console.log('you lose is running')
}

function gameRestart(){
    console.log('game restart is running')
    levelOne.style.display = 'none'
    playAgainBtn.style.display = 'block'
}

playAgainBtn.addEventListener('click', function(){
    clearPimples()
    gameInit()
    startTimer(timeCount)
    resultMessage.innerHTML = ''
})

function clearPimples(){
    allPimples = document.querySelectorAll('.pimple')
    console.log('clear pimples is running')
    for(let i=0; i < allPimples.length; i++){
        allPimples[i].remove()
    }
}

gameInit()
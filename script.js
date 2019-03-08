const startButton = document.querySelector('#start-button')
let timerSpan = document.querySelector('#timer')
let resultMessage = document.getElementById('result')
const gamePage = document.querySelector('#level-1')
const playAgainBtn = document.querySelector('#replay-button')
const audio = new Audio('audio/Blop-Mark_DiAngelo-79054334.mp3')
let allPopped = document.querySelectorAll('.popped')
let allPimples = document.querySelectorAll('.pimple')
let maxPimples = 15;
let currentMax
let timeCount = 15
let currentTimeCount
let active = true
let win = false

function gameInit() {
    gamePage.style.display = 'block'
    playAgainBtn.style.display = 'none'
    manyPimples()
}

startButton.addEventListener('click', function () {
    startTimer(timeCount)
})

function startTimer(seconds) {
    currentTimeCount = timeCount
    timerSpan.innerText = "00:" + timeCount
    let timer = setInterval(function () {
        seconds -= 1
        currentTimeCount -= 1
        if (seconds === 0) {
            active = false
            checkWinLose()
        }

        if (seconds.toString().length === 1) {
            seconds = "0" + seconds
        }
        if (win === true) {
            clearInterval(timer)
        }
        timerSpan.innerText = "00:" + seconds
    }, 1000)

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
    active = true
    win = false

    newPimple.addEventListener('click', popPimple = e => {
        newPimple.classList.add('popped')
        audio.play()
        setTimeout(() => {
            newPimple.style.display = "none"
            currentMax -= 1
            document.body.removeChild(newPimple);
            if (currentMax === 0 && active) {
                youWon()
            }
        }, 1000)
    })
}


let manyPimples = function () {
    currentMax = maxPimples
    for (let i = 0; i < maxPimples; i++) {
        createPimple()
    }
}

function checkWinLose() {
    if (currentMax > 0 && currentTimeCount === 0) {
        youLose()
    } gameRestart()
}

function stopTimer() {
    clearInterval(startTimer)
}

function youWon() {
    win = true
    resultMessage.innerHTML = 'You won!'
    gameRestart()
}

function youLose() {
    stopTimer()
    resultMessage.innerHTML = 'Out of time'
}

function gameRestart() {
    gamePage.style.display = 'none'
    playAgainBtn.style.display = 'block'
}

playAgainBtn.addEventListener('click', function () {
    clearPimples()
    gameInit()
    startTimer(timeCount)
    resultMessage.innerHTML = ''
})

function clearPimples() {
    allPimples = document.querySelectorAll('.pimple')
    for (let i = 0; i < allPimples.length; i++) {
        allPimples[i].remove()
    }
}

gameInit()
const startButton = document.querySelector('#start-button')
let resultMessage = document.getElementById('result')
const levelOne = document.querySelector('#level-1')
const playAgainBtn = document.querySelector('#replay-button')
let allPopped = document.querySelectorAll('.popped')
let allPimples = document.querySelectorAll('.pimple')
let max = 10;
let active = true

startButton.addEventListener('click', function () {
    startTimer(15)
    gameInit()
})

function startTimer(seconds) {
    let timerSpan = document.querySelector('#timer')
    let timer = setInterval(function () {
        seconds -= 1;

        if (seconds === 0) {
            active = false
            checkWinLose()
        }

        if (seconds.toString().length === 1) {
            seconds = "0" + seconds
        }
        timerSpan.innerText = "00:" + seconds
    }, 1000);

    setTimeout(function () {
        clearInterval(timer)
    }, (seconds * 1000))

}


const createPimple = function (max) {
    let newPimple = document.createElement('div')
    newPimple.setAttribute('class', 'pimple')
    document.body.appendChild(newPimple)
    newPimple.style.top = (Math.random() * window.innerHeight) + "px"
    newPimple.style.left = (Math.random() * window.innerWidth) + "px"

    newPimple.addEventListener('click', popPimple = e => {
        newPimple.classList.add('popped')
        setTimeout(() => {
            newPimple.style.display = "none"
            allPopped = document.querySelectorAll('.popped')
            if (allPopped.length === max && active) {
                youWon()
            }
        }, 1000)
    })
}


for (let i = 0; i < max; i++) {
    createPimple(max)
}

function checkWinLose() {
    allPopped = document.querySelectorAll('.popped')
    console.log(allPopped.length)
    if (allPopped.length === max) {
        youWon()
    } else {
        youLose()
    }
}

function youWon() {
    resultMessage.innerHTML = 'You won!'
}

function youLose() {
    resultMessage.innerHTML = 'Out of time'
}

function gameInit(){
    levelOne.style.display = 'block'
    playAgainBtn.style.display = 'none'
}

// function restartGame(){
//     for(let i=0; i <allPopped.length; i++){
//         allPopped[i].remove()
//     }
// }



const startButton = document.querySelector('#start-button')

startButton.addEventListener('click',function(){
    startTimer(15)
})

function startTimer(seconds){
    let timerSpan =document.querySelector('#timer')
    let timer = setInterval(function() {
        seconds -= 1;
        if(seconds === 0){
            youLose();
            // clearPimples();
        }
        if(seconds.toString().length === 1){
            seconds = "0"+seconds
        }
        timerSpan.innerText = "00:" + seconds
    }, 1000);

    setTimeout(function(){
        clearInterval(timer)
    }, (seconds*1000))

}



const createPimple = function(max){
    let newPimple = document.createElement('div')
    newPimple.setAttribute('class', 'pimple')
    document.body.appendChild(newPimple)
    newPimple.style.top = (Math.random() * window.innerHeight) + "px"
    newPimple.style.left = (Math.random() * window.innerWidth) + "px"

    newPimple.addEventListener('click', popPimple = e =>{
        newPimple.classList.add('popped')
        setTimeout( () =>{
            newPimple.style.display = "none";
            let allPopped = document.querySelectorAll('.popped')
            console.log(allPopped);
            if(allPopped.length === max){
                youWon();
            }
        }, 1000)
    })
}

let max =10;

for(let i=0; i<max; i++){
    createPimple(max)
}

function youWon(){
    let resultMessage = document.createElement('div')
    resultMessage.innerHTML = 'You won!'
    document.querySelector('#result').appendChild(resultMessage)
}

// function clearPimples(){
    
// }


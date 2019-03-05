const createPimple = function(){
    let newPimple = document.createElement('div')
    newPimple.setAttribute('class', 'pimple')
    document.body.appendChild(newPimple)
    newPimple.style.top = (Math.random() * window.innerHeight) + "px"
    newPimple.style.left = (Math.random() * window.innerWidth) + "px"

    newPimple.addEventListener('click', popPimple = e =>{
        newPimple.classList.add('popped')
    })
}

for(let i=0; i<10; i++){
    createPimple()
}
const samolot = document.getElementById("samolot");
const plansza = document.getElementById("plansza");
var liczba = document.getElementById("liczba");
var przycisk = document.getElementById("przycisk");
var liczba2 = document.getElementById("liczba2");
let posX = 100;
let posY = 100;
let wygrana = 0;
const krok = 50;
let zmienna = 1;
let uratowani =0;
let polegli = 0;
document.addEventListener("keydown",ruch =>{
    console.log(event.key);
    switch (event.key){
        case 'w':
            if(posY - krok >= 0){
                posY -=krok;
                samolot.style.top = posY+'px';
                }
                break;
        case 's':
            if(posY + krok <= window.innerHeight - samolot.clientHeight){
                posY += krok;
                samolot.style.top = posY+'px';
            }
            break;
        case 'a':
            if (posX - krok >= 0){ 
                posX -= krok;
                samolot.style.left = posX+'px';
                samolot.style.transform = 'scaleX(-1)';
            } 
            break;
        case 'd':
            if (posX + krok <= window.innerWidth - samolot.clientWidth){
                posX += krok; 
                samolot.style.left = posX+'px';
                samolot.style.transform = 'scaleX(1)';
            }
            break;
    }


});

function klikniecie(){
przycisk.style.visibility= 'hidden'
wygrana =0;
const gra = setInterval(() => {
    dropElement();
    if(uratowani == 30){
        clearInterval(gra);
        alert("Gratujacje Wygrałeś/aś")
        przycisk.style.visibility= 'visible'
        uratowani = 0;
        polegli =0;
        wygrana = 1;
        liczba.textContent = "Liczba Uratowanych ludzi: "+uratowani;
        liczba2.textContent = "Liczba ludzi, których nie udało się uratować:"+polegli;
    }
    if(polegli == 10){
        clearInterval(gra);
        alert("Niestety Przegrałeś/aś")
        przycisk.style.visibility= 'visible'
        uratowani = 0;
        polegli =0;
        wygrana = 1;
        liczba.textContent = "Liczba Uratowanych ludzi: "+uratowani;
        liczba2.textContent = "Liczba ludzi, których nie udało się uratować:"+polegli;
    }
}, 1000);
}

function checkCollision(fallingElement) {
    const samolotRect = samolot.getBoundingClientRect();
    const fallingElementRect = fallingElement.getBoundingClientRect();

    return !(
        samolotRect.top > fallingElementRect.bottom || 
        samolotRect.bottom < fallingElementRect.top ||
        samolotRect.left > fallingElementRect.right || 
        samolotRect.right < fallingElementRect.left    
    );
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dropElement() {
    const fallingElement = document.createElement('img');
        if(zmienna % 2 ==0){
        fallingElement.src = 'pliki/stickman1.png';
        zmienna++;
        }
        else{
        fallingElement.src = 'pliki/stickman2.png';
        zmienna++;
        }
        let pozycjaX = getRandomInt(1,100);
    fallingElement.className = 'stickman';
    document.getElementById('plansza').appendChild(fallingElement);
        fallingElement.style.left = pozycjaX + '%';
    let position = 0;
    const fallInterval = setInterval(() => {
        if(wygrana == 1){
            fallingElement.remove();
            clearInterval(fallInterval);
        }
        if (position < window.innerHeight) {
            position += 2;
            fallingElement.style.top = position + 'px';

            if (checkCollision(fallingElement)) {
                uratowani++;
                liczba.textContent = "Liczba Uratowanych ludzi: "+uratowani;
                clearInterval(fallInterval);
                fallingElement.remove();
            }

        } else {
            clearInterval(fallInterval);
            fallingElement.remove();
            polegli++;
            liczba2.textContent = "Liczba ludzi, których nie udało się uratować:"+polegli;
        }
    }, 20);
}

const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score-board');
const startBtn = document.querySelector('.start');

let lastMole;
let score;
let timeUp;

function randomMole(mole) {
    const rIndex = Math.floor(Math.random() * mole.length);
    if (mole[rIndex] === lastMole) {
        return randomMole(mole);
    }
    lastMole = mole[rIndex];
    return mole[rIndex];
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function peek() {
    const rMole = randomMole(moles);
    const rTime = randomTime(300, 800);

    rMole.classList.add('up');
    setTimeout(() => {
        rMole.classList.remove('up');
        if (!timeUp) {
            peek();
        }
    }, rTime);
}

function startGame() {
    startBtn.setAttribute('disabled', true);
    timeUp = false;
    score = 0;
    scoreBoard.textContent = 0;

    setTimeout(() => {
        peek();
        setTimeout(() => {
            timeUp = true;
            startBtn.removeAttribute('disabled');
        }, 10000);
    }, 1500);
}
startBtn.addEventListener('click', startGame);

moles.forEach(mole => {
    mole.addEventListener('click', function (e) {
        // if (!e.isTrusted) return;
        score++;
        this.classList.remove('up');
        scoreBoard.textContent = score;
    });
});

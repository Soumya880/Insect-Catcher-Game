document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const gameArea = document.getElementById('game-area');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreDisplay = document.getElementById('final-score');

    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let insectInterval;

    const insectImages = [
        'bettle.png',
        'butterfly.png',
        'ladybug.png',
        'mosquito.png',
        'dragonfly.png'
    ];

    function startGame() {
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        gameOverScreen.classList.add('hidden');
        gameArea.innerHTML = '';
        startButton.classList.add('hidden');

        gameInterval = setInterval(updateTimer, 1000);
        insectInterval = setInterval(spawnInsect, 1000);
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(insectInterval);
        gameOverScreen.classList.remove('hidden');
        finalScoreDisplay.textContent = score;
        startButton.classList.remove('hidden');
    }

    function updateTimer() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }

    function spawnInsect() {
        const insect = document.createElement('div');
        insect.classList.add('insect');
        const randomImage = insectImages[Math.floor(Math.random() * insectImages.length)];
        insect.style.backgroundImage = `url('${randomImage}')`;
        insect.style.top = `${Math.random() * (gameArea.clientHeight - 50)}px`;
        insect.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;

        insect.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            insect.remove();
        });

        gameArea.appendChild(insect);

        setTimeout(() => {
            if (insect.parentElement) {
                insect.remove();
            }
        }, 3000);
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
});

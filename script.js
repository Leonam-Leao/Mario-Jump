const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartBtn = document.querySelector('.restart-btn'); // NOVO: Seleciona o botão

const jump = () => {
    if (mario.classList.contains('jump')) return;

    mario.classList.add('jump');    
    
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipeRect = pipe.getBoundingClientRect();
    const marioRect = mario.getBoundingClientRect();

    const colidiuX = pipeRect.left <= marioRect.right && pipeRect.right >= marioRect.left;
    const colidiuY = marioRect.bottom >= pipeRect.top && marioRect.top <= pipeRect.bottom;

    if (colidiuX && colidiuY) {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/mario-jump-images/game-over.png'; 
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // NOVO: Mostra o botão de restart quando o jogo acaba
        restartBtn.style.display = 'block';

        clearInterval(loop);
    }

}, 10);

// NOVO: Função que o botão chama ao ser clicado para reiniciar o jogo
const reiniciarJogo = () => {
    window.location.reload(); // Recarrega a página atual de forma limpa
}

document.addEventListener('keydown', jump);
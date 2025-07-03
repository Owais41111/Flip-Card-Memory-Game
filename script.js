let icons = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍍', '🥝', '🍉', '🍋', '🥥', '🥭', '🍈'];
let cards = [];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame(level) {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    let selectedIcons = icons.slice(0, level);
    cards = shuffle([...selectedIcons, ...selectedIcons]);
    board.style.gridTemplateColumns = `repeat(${Math.min(level, 4)}, 100px)`;
    matchedCards = [];
    flippedCards = [];
    document.getElementById('popup').style.display = 'none';

    cards.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;

        const frontFace = document.createElement('div');
        frontFace.classList.add('card-face', 'front');

        const backFace = document.createElement('div');
        backFace.classList.add('card-face', 'back');
        backFace.textContent = icon;

        card.appendChild(frontFace);
        card.appendChild(backFace);
        board.appendChild(card);

        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip') && !this.classList.contains('match')) {
        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('match');
        card2.classList.add('match');
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            setTimeout(() => showPopup('🎉 You Win! 🎉'), 500);
        }
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        flippedCards = [];
    }
}

function showPopup(message) {
    document.getElementById('popupMessage').textContent = message;
    document.getElementById('popup').style.display = 'block';
}

startGame(4);
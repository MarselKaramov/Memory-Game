const game_node = document.querySelector('#game-board')
const victory_text = document.querySelector('#victory-massage')
const start_game_button = document.querySelector('#new-game-button')

const visible_card_class_name = 'visible';
const card_rotate_time = 500;
 
const card_elements = ["🍓", "🍉", "🍌", "🍏", "🥝", "🍇"]

const card_amount = 12
let visible_cards = []

start_game_button.addEventListener('click', startGame);

function startGame() {
    [game_node, victory_text].forEach(node => node.innerHTML = "");

    const card_values = generateArr(card_elements, card_amount)
    
    card_values.forEach(randerCard)

    const renderedCards = document.querySelectorAll('.card')

    renderedCards.forEach((card) => card.classList.add('visible'))

    setTimeout(() =>{
        renderedCards.forEach((card) => card.classList.remove('visible'))
    }, 1000)
}

function generateArr(emojis, cardAmount){
    const randomArr = []
    const elementCounts = {};
    
    for (const emoji of emojis) {
       elementCounts[emoji] = 0;
    }

    while (randomArr.length < cardAmount) {
        const randomIndex = Math.floor(Math.random() * emojis.length);
        const randomElement = emojis[randomIndex];
        
        if (elementCounts[randomElement] < 2) {
            randomArr.push(randomElement);
            elementCounts[randomElement]++
        }
    }
    return randomArr
}   

function randerCard(emoji) {
    const card = document.createElement('div')
    card.classList.add('card')

    const cardInner = document.createElement('div')
    cardInner.classList.add('card-inner')

    const cardFront = document.createElement('div')
    cardFront.classList.add('card-front')

    const cardBack = document.createElement('div')
    cardBack.classList.add('card-back')

    cardFront.textContent = '?'
    cardBack.textContent = emoji

    cardInner.appendChild(cardFront)
    cardInner.appendChild(cardBack)
    card.appendChild(cardInner)

    card.addEventListener("click", () => {
        handleCardClick(card)
    });

    game_node.appendChild(card)
}

function handleCardClick(card) {
    if (card.classList.contains(visible_card_class_name)) {
        return;
    }

    const checkVictory = () => {
        const visibleCardNodes = document.querySelectorAll('.visible');

        const isVictory = visibleCardNodes.length === card_amount;
        const victoryMessage = 'Вы выиграли!'
        
        if (isVictory) {
            victory_text.textContent = victoryMessage;
        }
    }
    
    card.querySelector('.card-inner').addEventListener("transitionend", checkVictory)
    
    card.classList.add(visible_card_class_name)
    visible_cards.push(card);

    if (visible_cards.length % 2 !== 0){
        return;
    }

    const [prelastCard, lastCard] = visible_cards.slice(-2);

    if (lastCard.textContent !==  prelastCard.textContent) {
        visible_cards = visible_cards.slice(0, visible_cards.length - 2)

        setTimeout(() => {
            lastCard.classList.remove(visible_card_class_name)
            prelastCard.classList.remove(visible_card_class_name)
        },card_rotate_time);
        
    }
}

startGame()

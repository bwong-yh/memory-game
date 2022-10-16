import { useEffect, useState } from 'react';
import './App.scss';
import Card from './components/Card';

const cardImgs = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);

  const createDeck = () => {
    // duplicate cards
    const newDeck = [...cardImgs, ...cardImgs]
      // randomize cards
      .sort(() => Math.random() - 0.5)
      // assign id to each card
      .map(card => ({ ...card, id: Math.random() }));

    // reset game everytime New Game button is clicked
    setCards(newDeck);
    setTurns(0);
  };

  // reset choices and add 1 to turn
  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns(prev => prev + 1);
  };

  console.log(cards);

  // compare cards; use useEffect
  useEffect(() => {
    const compareChoices = () => {
      if (choice1.src === choice2.src) {
        setCards(prev => {
          return prev.map(card => {
            if (card.src === choice1.src || card.src === choice2.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }

      resetTurn();
    };

    // ensure both choices are existed
    if (choice1 && choice2) compareChoices();
  }, [choice1, choice2]);

  // handle choice
  const handleChoice = card => {
    console.log(card);
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={createDeck}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={() => handleChoice(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

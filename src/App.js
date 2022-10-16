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
  const [disable, setDisable] = useState(false);

  const createDeck = () => {
    // duplicate cards
    const newDeck = [...cardImgs, ...cardImgs]
      // randomize cards
      .sort(() => Math.random() - 0.5)
      // assign id to each card
      .map(card => ({ ...card, id: Math.random() }));

    // reset game every time New Game button is clicked
    setChoice1(null);
    setChoice2(null);
    setCards(newDeck);
    setTurns(0);
  };

  // reset choices and add 1 to turn
  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns(prev => prev + 1);
    setDisable(false);
  };

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

      // setTimeout to let users remember the card for 1 sec
      setTimeout(() => {
        resetTurn();
      }, 1000);
    };

    // ensure both choices are existed
    if (choice1 && choice2) {
      // setDisable true to prevent users clicking more than 2 cards
      setDisable(true);
      compareChoices();
    }
  }, [choice1, choice2]);

  // handle choice
  const handleChoice = card => {
    console.log(card);
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  // start game automatically
  useEffect(() => {
    createDeck();
  }, []);

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={createDeck}>New Game</button>
      <p>Turns: {turns}</p>

      <div className='card-grid'>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={() => handleChoice(card)}
            flipped={card === choice1 || card === choice2 || card.matched}
            disable={disable}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

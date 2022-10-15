import { useState } from 'react';
import './App.scss';
import Card from './components/Card';

const cardImgs = [
  { src: '/img/helmet-1.png' },
  { src: '/img/potion-1.png' },
  { src: '/img/ring-1.png' },
  { src: '/img/scroll-1.png' },
  { src: '/img/shield-1.png' },
  { src: '/img/sword-1.png' },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

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

  console.log('cards: ', cards, 'turns: ', turns);

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={createDeck}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;

import './App.scss';

const cards = [
  { src: '/img/helmet-1.png' },
  { src: '/img/potion-1.png' },
  { src: '/img/ring-1.png' },
  { src: '/img/scroll-1.png' },
  { src: '/img/shield-1.png' },
  { src: '/img/sword-1.png' },
];

function App() {
  const createDeck = () => {
    // duplicate cards
    const newDeck = [...cards, ...cards]
      // randomize cards
      .sort(() => Math.random() - 0.5)
      // assign id to each card
      .map(card => ({ ...card, id: Math.random() * 100 }));

    console.log(newDeck);
  };

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={createDeck}>New Game</button>
    </div>
  );
}

export default App;

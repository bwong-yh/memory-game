import './Card.scss';

const Card = ({ card, handleChoice, flipped }) => {
  const handleClick = () => {
    handleChoice();
  };

  return (
    <div className='card'>
      <div className={flipped ? 'card__flipped' : ''}>
        <img src={card.src} alt='card front' className='card--front' />
        <img
          src='/img/cover.png'
          alt='cover'
          className='card--back'
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;

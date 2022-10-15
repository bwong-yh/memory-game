import './Card.scss';

const Card = ({ card }) => {
  return (
    <div className='card'>
      <div>
        <img src={card.src} alt='card front' className='card-front' />
        <img src='/img/cover.png' alt='cover' className='card-back' />
      </div>
    </div>
  );
};

export default Card;

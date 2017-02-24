import React, { PropTypes } from 'react';
import Card from './Card';

const CardGroup = ({ cards, type, onCardClick, selectedCards }) => (
  <ul
    className={'card-group'}
  >
    {cards.map(card =>
      <Card
        key={card}
        value={card}
        type={type}
        onClick={() => onCardClick(card)}
        selected={selectedCards && selectedCards.indexOf(card) !== -1}
      />
    )}
  </ul>
);

CardGroup.propTypes = {
  onCardClick: PropTypes.func,
  cards: PropTypes.array.isRequired,
  type: PropTypes.string,
};

export default CardGroup;

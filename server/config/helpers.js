const big2Rooms = require('./../models/big2Rooms');

const createCardDeck = () => {
  const deck = [];
  const suits = ['♥', '♣', '♠', '♦'];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(suit + value);
    });
  });
  return deck;
};

const shuffleCardDeck = () => {
  const deck = createCardDeck();
  for (var i = 0; i < deck.length; i += 1) {
    var swapCardIndex = Math.floor(Math.random() * (deck.length - i)) + i;
    var newCard = deck[swapCardIndex];
    deck[swapCardIndex] = deck[i];
    deck[i] = newCard;
  }
  return deck;
};

const dealCards = (numPlayers) => {
  const deck = shuffleCardDeck();
  const handSize = deck.length / numPlayers;
  var hands = [];
  for (var i = 0; i < numPlayers; i += 1) {
    var startIndex = i * handSize;
    var endIndex = startIndex + handSize;
    hands.push(deck.slice(startIndex, endIndex));
  }
  return hands;
};

const createGame = () => {
  const deck = shuffleCardDeck();
  const hands = dealCards(deck, 4);
  return {
    round: 1,
    players: {

    },
    hands,
    socketMap: {

    },
    pot: [{ user: '', cards: [] }, { user: '', cards: [] }],
    turn: 'player1',
    roundStartedBy: 'player1',
  };
};

// const playHandToRoom = (room, playerNum, updatedHand) => {
//   // const
//   big2Rooms.rooms[room].hands[playerNum] = updatedHand;
// };

const updatePlayerHand = (user, room, cards, remove) => {
  // Grab players hand from room object
  const playerHand = big2Rooms.rooms[room].playerHands[user];
  const newPlayerHand = [];
  const validatedHand = [];
  // console.log('attempted to play bad cards: ', cards);
  // Iterate over old hand
  if (remove === true) {
    playerHand.forEach((val) => {
      // If old hand's card is not in played cards array
      // push it to hand array
      if (cards.indexOf(val) === -1) {
        newPlayerHand.push(val);
      } else {
        // console.log('val ', val);
        validatedHand.push(val);
      }
    });
    big2Rooms.rooms[room].playerHands[user] = newPlayerHand;
    big2Rooms.rooms[room].pot.push({ user, cards: validatedHand });
  } else {
    big2Rooms.rooms[room].playerHands[user] = playerHand.concat(validatedHand);
    big2Rooms.rooms[room].pot.pop();
  }
  return big2Rooms.rooms[room].playerHands[user];
};

module.exports = {
  createCardDeck,
  shuffleCardDeck,
  dealCards,
  createGame,
  updatePlayerHand,
};

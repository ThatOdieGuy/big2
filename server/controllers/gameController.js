const big2Rooms = require('./../models/big2Rooms');
const helpers = require('./../config/helpers');

const gameController = {
  playCards(user, room, cards) {
    const pot = big2Rooms[room].pot;
    const newHand = helpers.updatePlayerHand(room, user, cards, true);
    pot.push({ user, cards });
    const prevRound = pot[pot.length - 2];
    const curRound = pot[pot.length - 1];
    const roundsTuple = [prevRound, curRound];
    return {
      newHand,
      roundsTuple,
    };
  },
  createGame(room) {
    // Grab connected users form turnOrder array
    let players = big2Rooms[room].turnOrder;
    // Call deal cards with number of users
    const cardHands = helpers.dealCards(players.length);
    // turn the two arrays into object key/value pairs
    players = players.reduce((obj, val, idx) => {
      const copy = Object.assign({}, obj);
      copy[val] = cardHands[idx];
      return copy;
    }, {});
    // set room's player object to the newly created object
    big2Rooms[room].players = players;
    // Check for which player has lowest card
    // Change turn value to their index in turnOrder
    // Emit to each socket their cards
  },
};

module.exports = gameController;

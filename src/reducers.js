import { combineReducers } from 'redux';

// t & m here are lazy. Make your code more readable with actionTypes & initialStates
import * as t from './actionTypes';
import * as m from './initialStates';

const username = (state = m.usernameInitialState, action) => {
  if (action.type === t.USERNAME_CHANGE) {
    return action.username;
  }
  return state;
};

const connectedPlayers = (state = m.connectedPlayersInitialState, action) => {
  if (action.type === t.UPDATE_CONNECTED_PLAYER_LIST) {
    return action.players;
  }
  return state;
};

const currentPlayersTurn = (state = m.currentPlayersTurnInitialState, action) => {
  if (action.type === t.UPDATE_CURRENT_PLAYER_TURN) {
    return action.player;
  }
  return state;
};

const room = (state = m.roomInitialState, action) => {
  if (action.type === t.ROOM_CHANGE) {
    return action.room;
  }
  return state;
};

const playerHand = (state = m.playerHandInitialState, action) => {
  if (action.type === t.UPDATE_PLAYER_HAND) {
    return action.cards;
  }
  return state;
};

const selectedCards = (state = m.selectedCardsInitialState, action) => {
  if (action.type === t.ADD_CARD_TO_SELECTED) {
    console.log('state: ', state);
    const cardIndex = state.indexOf(action.card);
    if (cardIndex === -1 && state.length < 5) {
      return [...state, action.card];
    } else if (cardIndex !== -1) {
      return [
        ...state.slice(0, cardIndex),
        ...state.slice(cardIndex + 1),
      ];
    }
  }
  if (action.type === t.CLEAR_CARDS_FROM_SELECTION) {
    console.log('selectedCards should rest to initial state~!');
    return m.selectedCardsInitialState;
  }
  return state;
};

const cardsInPot = (state = m.potInitialState, action) => {

  if (action.type === t.UPDATE_CARDS_IN_POT) {
    console.log('cardsInPot reducer action.cards: ', action.cards);
    return action.cards;
  }
  return state;
};

export default combineReducers({
  username,
  connectedPlayers,
  currentPlayersTurn,
  room,
  playerHand,
  selectedCards,
  cardsInPot,
});

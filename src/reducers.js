import { combineReducers } from 'redux';

import * as t from './actionTypes';
import * as m from './initialStates';

const username = (state = m.usernameInitialState, action) => {
  if (action.type === t.USERNAME_CHANGE) {
    return action.username;
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
    return [...state, action.card];
  }
  return state;
};

export default combineReducers({
  username,
  playerHand,
  selectedCards,
});

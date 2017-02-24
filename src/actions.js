import io from 'socket.io-client';

import * as t from './actionTypes';

// If additional games are implemented, handle it here:
const chosenGame = 'big2';
// For webpack's dev hot it needs localhost path
const big2 = io(`http://localhost:9090/${chosenGame}`);
// For production we need just the namespace
//const big2 = io(`/${chosenGame}`);


// const testRoom = 'hostname with hash';
// const user = `player${Math.random()}`;
// Move to listener when room is dynamic

/* ------------ REGULAR ACTIONS ---------------*/

export const changeUsername = username => ({
  type: t.USERNAME_CHANGE,
  username,
});

export const changeRoom = room => ({
  type: t.ROOM_CHANGE,
  room,
});

export const addCardToSelection = card => ({
  type: t.ADD_CARD_TO_SELECTED,
  card,
});

export const clearCardsFromSelection = () => ({
  type: t.CLEAR_CARDS_FROM_SELECTION,
});

export const updatePlayerHand = cards => ({
  type: t.UPDATE_PLAYER_HAND,
  cards,
});

export const updateCardsInPot = cards => ({
  type: t.UPDATE_CARDS_IN_POT,
  cards,
});

export const updateConnectedPlayersList = players => ({
  type: t.UPDATE_CONNECTED_PLAYER_LIST,
  players,
});

export const currentPlayersTurn = player => ({
  type: t.UPDATE_CURRENT_PLAYER_TURN,
  player,
});

/**
 *  These dispatchers & emitters use strings to define message. And they are copied and pasted around the code.
 *  It's better to use a shared constants file which has these all in them
 *  something like: const SocketDispatchers.PLAYER_CARDS = "player cards";
 *
 *  Currently, 'player cards' string exists 6 times in your code. If some other developer comes in and changes stuff,
 *  like changing this to something more readable 'player cards' -> 'update player cards',
 *  he might accidentally only change 5 of the 6 things which will lead to weird bugs.
 *
 *  looks like you've done this with actionTypes.js, just keep it up with this other stuff too.
 */

/* ------------ SOCKET LISTENERS ---------------*/
// These will dispatch actions when server sends data
export const socketDispatchers = (store) => {
  big2
  .on('player cards', (cards) => {
    // console.log('cards dealt: ', cards);
    store.dispatch(updatePlayerHand(cards));
  })
  .on('problem joining room', (message) => {
    console.log(message);
  })
  .on('hand played to pot', (cards) => {
    // console.log('hand played to pot received from server: ', cards);
    store.dispatch(updateCardsInPot(cards));
  })
  .on('hand removed from pot', (cards) => {
    // console.log('hand removed from pot received from server: ', cards);
    store.dispatch(updateCardsInPot(cards));
  })
  .on('players in room', (connectedPlayers) => {
    store.dispatch(updateConnectedPlayersList(connectedPlayers));
  })
  .on('player turn', (player) => {
    console.log('it is this player\'s turn: ', player);
    store.dispatch(currentPlayersTurn(player));
  })
  .on('problem creating game', (problem) => {
    console.log('Problem creating game: ', problem);
  });
};

/* ------------ SOCKET EMITTERS ---------------*/
// These will send data to server when client dispatches actions
export const connectToRoom = (user, room) => (
  big2.emit('connect to room', user, room)
);
// Hardcoded setup
// connectToRoom(testRoom);

export const playSelectedCards = (user, room, cards) => (
  big2.emit('play cards', user, room, cards)
);

export const undoPlayedHand = (user, room) => (
  big2.emit('undo played hand', user, room)
);

export const beginGame = (user, room) => (
  big2.emit('create game', user, room)
);

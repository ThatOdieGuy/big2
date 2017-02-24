import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Access socket emitters directly since they don't pass to reducers

//a -> actions
import * as a from './../actions';
import CardGroup from './CardGroup';
import GamePot from './GamePot';
import ConnectedPlayers from './ConnectedPlayers';

const mapStateToProps = state => ({
  user: state.username,
  connectedPlayers: state.connectedPlayers,
  currentPlayersTurn: state.currentPlayersTurn,
  room: state.room,
  pot: state.cardsInPot,
  playerHand: state.playerHand,
  selectedCards: state.selectedCards,
});
const mapDispatchToProps = dispatch => ({
  addCardToSelection: card => (
    dispatch(a.addCardToSelection(card))
  ),
  clearCardsFromSelection: () => (
    dispatch(a.clearCardsFromSelection())
  ),
});

// Export class so it can be tested w/o store
export const GameRoom = ({
  user,
  connectedPlayers,
  currentPlayersTurn,
  room,
  pot,
  playerHand,
  selectedCards,
  addCardToSelection,
  clearCardsFromSelection,
}) => (
  <div
    className={'game-room-container'}
  >
    <div
      className={'room-header'}
    >
      <ConnectedPlayers
        user={user}
        players={connectedPlayers}
        currentPlayer={currentPlayersTurn}
        room={room}
      />
      <div
        className={'game-buttons-container'}
      >
        <button
          onClick={() => {
            clearCardsFromSelection();
            a.beginGame(user, room);
          }}
        >
          Start Game
        </button>
      </div>
    </div>
    <div
      className={'game-pot-container'}
    >
      <GamePot
        pot={pot}
      />
    </div>
    <div
      className={'round-buttons-container'}
    >
      <button
        onClick={() => {
          clearCardsFromSelection();
          a.undoPlayedHand(user, room);
        }}
      >
        Undo Played Hand
      </button>
      <button
        onClick={() => {
          clearCardsFromSelection();
          a.playSelectedCards(user, room, ['PASS']);
        }}
      >
        Pass
      </button>
      <button
        onClick={() => {
          // console.log('submit selection clicked with selection: ', selectedCards);
          clearCardsFromSelection();
          a.playSelectedCards(user, room, selectedCards);
        }}
      >
        Play Hand
      </button>
    </div>
    <div
      className={'player-hand-container'}
    >
      <CardGroup
        cards={playerHand}
        type={'playerHand'}
        onCardClick={(card) => {
          addCardToSelection(card);
        }}
        selectedCards={selectedCards}
      />
    </div>
  </div>
);

GameRoom.propTypes = {
  user: PropTypes.string,
  connectedPlayers: PropTypes.array,
  currentPlayersTurn: PropTypes.string,
  room: PropTypes.string,
  pot: PropTypes.array,
  playerHand: PropTypes.array,
  selectedCards: PropTypes.array,
  addCardToSelection: PropTypes.func,
  playSelectedCards: PropTypes.func,
  clearCardsFromSelection: PropTypes.func,
};

const GameRoomContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameRoom);

export default GameRoomContainer;

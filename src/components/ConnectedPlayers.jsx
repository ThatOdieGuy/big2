/**
 * All these components could use header comments to explain what is going on.
 */


import React, { PropTypes } from 'react';

import PlayerCard from './PlayerCard';

const ConnectedPlayers = ({ user, currentPlayer, players, room }) => (
  <div
    className={'connected-players-container'}
  >
    <div
      className={'connected-players-list flex-parent'}
    >
      {players.map(player => (
        <PlayerCard
          className={''}
          key={player}
          player={player}
          currentPlayer={currentPlayer}
        />
        )
      )}
    </div>
  </div>
);


ConnectedPlayers.propTypes = {
  user: PropTypes.string,
  currentPlayer: PropTypes.string,
  players: PropTypes.array,
  room: PropTypes.string,
};

export default ConnectedPlayers;

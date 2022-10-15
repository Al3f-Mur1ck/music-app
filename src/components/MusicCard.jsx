import PropTypes from 'prop-types';
import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { music: { trackName, previewUrl, trackId }, handleFavoriteInput,
      checkedFavoriteTracks } = this.props;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ `music-${trackId}` }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            name={ trackId }
            id={ `music-${trackId}` }
            type="checkbox"
            onChange={ handleFavoriteInput }
            checked={ checkedFavoriteTracks }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.instanceOf(Object).isRequired,
  handleFavoriteInput: PropTypes.func.isRequired,
  checkedFavoriteTracks: PropTypes.bool.isRequired,
};

export default MusicCard;

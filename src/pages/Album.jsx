import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    artistName: '',
    albumName: '',
    albumArt: '',
    albumId: [],
    isLoading: false,
    savedFavorites: [],
  }

  componentDidMount= async () => {
    const { albumId } = this.state;
    this.getAlbum(albumId);
    this.getFavorite();
  }

  getAlbum = async () => {
    const { match } = this.props;
    const musics = await getMusics(match.params.id);
    console.log(musics);
    this.setState({
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
      albumArt: musics[0].artworkUrl100,
    }, () => {
      this.setState({ albumId: musics.filter((song) => song.trackId) });
    });
  };

  getFavorite = async () => {
    this.setState({ isLoading: true });
    const savedFavorites = await getFavoriteSongs();
    this.setState({
      savedFavorites,
      isLoading: false,
    });
  }

  checkedFavoriteTracks = (track) => {
    const { savedFavorites } = this.state;
    return savedFavorites.some((favorite) => favorite.trackId === track.trackId);
  }

  handleFavoriteInput = async ({ target }) => {
    this.setState({ isLoading: true });
    const { albumId } = this.state;
    const targetName = Number(target.name);
    console.log('targetName', targetName);
    const favoriteSong = albumId.find(({ trackId }) => trackId === targetName);
    console.log('favoriteSong', favoriteSong);
    if (target.checked) {
      await addSong(favoriteSong);
    } else {
      await removeSong(favoriteSong);
    }
    await this.getFavorite();
    this.setState({ isLoading: false });
  };

  render() {
    const { albumId, artistName, albumName, albumArt, isLoading } = this.state;
    const { handleFavoriteInput, checkedFavoriteTracks } = this;
    return (
      <div data-testid="page-album">
        <Header />
        {isLoading && <Loading />}
        <div>
          <img src={ albumArt } alt={ albumName } />
          <h2 data-testid="album-name">
            { albumName }
          </h2>
          <h3 data-testid="artist-name">
            { artistName }
          </h3>
          {albumId.map((music, index) => (
            <MusicCard
              key={ index }
              music={ music }
              handleFavoriteInput={ handleFavoriteInput }
              checkedFavoriteTracks={ checkedFavoriteTracks(music) }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default Album;

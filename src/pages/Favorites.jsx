import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: false,
    savedFavorites: [],
  }

  componentDidMount = async () => {
    this.getFavorite();
  }

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
    const { savedFavorites } = this.state;
    const targetName = Number(target.name);
    console.log('targetName', targetName);
    const favoriteSong = savedFavorites.find(({ trackId }) => trackId === targetName);
    console.log('favoriteSong', favoriteSong);
    if (!target.checked) {
      await removeSong(favoriteSong);
    }
    await this.getFavorite();
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, savedFavorites } = this.state;
    const { handleFavoriteInput, checkedFavoriteTracks } = this;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        {isLoading && <Loading />}
        <div>
          {savedFavorites.map((music, index) => (
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
export default Favorites;

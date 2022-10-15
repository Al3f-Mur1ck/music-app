import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    isButtonDisabled: true,
    search: '',
    isLoading: false,
    searchList: [],
    savedSearch: '',
  }

  buttonValidation = () => {
    const { search } = this.state;
    const minLength = 2;
    this.setState({
      isButtonDisabled: search.length < minLength,
    });
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState(({ search: value }),
      this.buttonValidation);
  }

  searchAPI = async () => {
    const { search } = this.state;
    const music = await searchAlbumsAPI(search);
    this.setState({
      savedSearch: search,
      search: '',
      searchList: music,
      isLoading: true,

    });
  }

  render() {
    const { isButtonDisabled, search, isLoading, searchList, savedSearch } = this.state;
    const { handleInputChange, searchAPI } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {isLoading ? <Loading /> : (
          <form>
            <input
              value={ search }
              data-testid="search-artist-input"
              onChange={ handleInputChange }
              type="text"
              name="searchInput"
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ searchAPI }
            >
              Pesquisar

            </button>
          </form>
        )}
        {isLoading && this.setState({ isLoading: false })}
        <div>
          {(
            searchList.length > 0)
            && (
              <p>
                {`Resultado de álbuns de: ${savedSearch}
          `}

              </p>
            )}
          {(searchList.length === 0) ? <p>Nenhum álbum foi encontrado</p> : (

            <div>
              {(searchList.map((musica) => (
                <section key={ musica.collectionId }>
                  <img src={ musica.artworkUrl100 } alt={ musica.collectionName } />
                  <Link
                    data-testid={ `link-to-album-${musica.collectionId}` }
                    to={ `/album/${musica.collectionId}` }
                  >
                    { musica.collectionName }
                  </Link>
                </section>

              )))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;

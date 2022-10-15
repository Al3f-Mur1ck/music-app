import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: [],
    isLoading: true,
  }

  async componentDidMount() {
    await this.getUserName();
  }

  getUserName = async () => {
    const userName = await getUser();
    // console.log(userName);
    this.setState({
      isLoading: false,
      name: userName,
    });
  }

  render() {
    const { isLoading, name } = this.state;
    return (
      <div>
        <p data-testid="header-user-name">{ name.name }</p>
        {isLoading ? <Loading /> : (
          <div>
            <header data-testid="header-component">Trybetunes</header>
            <nav>
              <Link data-testid="link-to-search" to="/search">Procurar</Link>
              {' '}
              <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
              {' '}
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
            </nav>
          </div>
        )}
      </div>
    );
  }
}

export default Header;

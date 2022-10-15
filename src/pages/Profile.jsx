import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    nome: '',
    email: '',
    image: '',
    description: '',
    isLoading: true,
  }

  async componentDidMount() {
    await this.getProfile();
  }

  getProfile = async () => {
    const profile = await getUser();
    // console.log(profile);
    this.setState({
      isLoading: false,
      nome: profile.name,
      email: profile.email,
      image: profile.image,
      description: profile.description,
    });
  }

  render() {
    const { isLoading, nome, email, image, description } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />

        {isLoading ? <Loading /> : (
          <div>
            <h1>Profile</h1>
            <img data-testid="profile-image" src={ image } alt={ nome } />
            <Link to="/profile/edit">Editar perfil</Link>
            <h1>Nome</h1>
            <p>{nome}</p>
            <h1>Email</h1>
            <p>{email}</p>
            <h1>Descrição</h1>
            <p>{ description }</p>
          </div>
        )}
      </div>

    );
  }
}

export default Profile;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isSavedButtonDisabled: true,
    isLoading: true,
  }

  componentDidMount = async () => {
    this.getProfile();
    this.saveBttnValidation();
  }

  getProfile = async () => {
    this.setState({ isLoading: true });
    const profile = await getUser();
    const { name, email, image, description } = profile;
    this.setState({
      name,
      email,
      image,
      description,
      isSavedButtonDisabled: true,
      isLoading: false,
    });
    console.log(profile);
  }

  handleInputChange = async ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }),
      this.saveBttnValidation());
  }

  saveBttnValidation = () => {
    const { name, email, description, image } = this.state;
    if (
      name === ''
      || email === ''
      || description === ''
      || image === ''
      || !email.includes('@')) {
      return this.setState({
        isSavedButtonDisabled: true,
      });
    }
    return this.setState({ isSavedButtonDisabled: false });
  }

  updateProfile = async () => {
    this.setState({ isLoading: true });
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    const profile = { name, email, image, description };
    await updateUser(profile);
    history.push('/profile');
    console.log(profile);
  }

  render() {
    const { isLoading, name, email, description, image,
      isSavedButtonDisabled } = this.state;
    const { handleInputChange, updateProfile } = this;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <Loading /> : (
          <form>
            <label htmlFor="edit-input-name">
              Name:
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                id="edit-input-name"
                value={ name }
                onChange={ handleInputChange }
              />
            </label>
            Email:
            <label htmlFor="edit-input-email">
              <input
                data-testid="edit-input-email"
                type="text"
                name="email"
                id="edit-input-email"
                value={ email }
                onChange={ handleInputChange }
              />
            </label>
            <label htmlFor="edit-input-description">
              Descrição:
              <input
                data-testid="edit-input-description"
                name="description"
                id="edit-input-description"
                type="text"
                value={ description }
                onChange={ handleInputChange }
              />
            </label>
            <label htmlFor="edit-input-image">
              imagem:
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                id="edit-input-image"
                value={ image }
                onChange={ handleInputChange }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ isSavedButtonDisabled }
              onClick={ updateProfile }
            >
              Editar perfil

            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push:
      PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;

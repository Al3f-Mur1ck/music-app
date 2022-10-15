import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
    state = {
      loginInput: '',
      isButtonDisabled: true,
      isLoading: false,
    }

    buttonValidation = () => {
      const { loginInput } = this.state;
      const minLength = 3;
      this.setState({
        isButtonDisabled: loginInput.length < minLength,
      });
    }

    handleInputChange = ({ target }) => {
      const { name, value } = target;
      this.setState(() => ({ [name]: value }),
        this.buttonValidation);
    }

  saveUserName = async () => {
    const { history } = this.props;
    const { loginInput } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: loginInput });
    // slack da turma 21, usar o history.push pra redirecionar
    history.push('/search');
  }

  render() {
    const { loginInput, isButtonDisabled, isLoading } = this.state;
    const { handleInputChange, saveUserName } = this;
    return (
      <div data-testid="page-login">
        {isLoading ? <Loading /> : (
          <form>
            <input
              type="text"
              data-testid="login-name-input"
              name="loginInput"
              value={ loginInput }
              onChange={ handleInputChange }
            />
            <button
              data-testid="login-submit-button"
              onClick={ saveUserName }
              disabled={ isButtonDisabled }
              type="button"
            >
              Entrar

            </button>
          </form>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push:
      PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;

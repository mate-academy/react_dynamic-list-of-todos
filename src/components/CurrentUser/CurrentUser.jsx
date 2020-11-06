import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
    isLoading: false,
    userError: false,
  }

  async componentDidMount() {
    const { userId, getUser } = this.props;

    this.updateIsLoading();

    try {
      const user = await getUser(userId);

      this.updateUser(user.data);
    } catch (error) {
      this.updateError();
    }
  }

  async componentDidUpdate(prevProps) {
    const { userId, getUser } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    this.updateIsLoading();

    try {
      const user = await getUser(userId);

      this.updateUser(user.data);
    } catch (error) {
      this.updateError();
    }
  }

  updateError() {
    this.setState({
      isLoading: false,
      userError: true,
    });
  }

  updateUser(user) {
    this.setState({
      isLoading: false,
      userError: false,
      user,
    });
  }

  updateIsLoading() {
    this.setState({
      isLoading: true,
    });
  }

  render() {
    if (this.state.userError || !this.state.user) {
      return <h2>User not found</h2>;
    }

    if (!this.state.user.id || this.state.isLoading) {
      return (
        <h1 className="loading">Loading...</h1>
      );
    }

    const { id, name, email, phone } = this.state.user;
    const { selectUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          type="button"
          className="CurrentUser__button button"
          onClick={() => selectUser(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  getUser: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
};

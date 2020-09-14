import React from 'react';
import './CurrentUser.scss';
import propTypes from 'prop-types';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.setUserData();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.userId !== this.props.userId) {
      this.setUserData();
    }
  }

  setUserData() {
    this.props.getUserData(this.props.userId)
      .then(userData => this.setState({ user: userData }));
  }

  render() {
    const { id, name, phone, email } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{ name }</h3>
        <p className="CurrentUser__email">{ email }</p>
        <p className="CurrentUser__phone">{ phone }</p>
        <button
          className="CurrentUser__clearButton"
          type="button"
          onClick={() => this.props.clearUser()}
        >
          Clear User
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: propTypes.number.isRequired,
  getUserData: propTypes.func.isRequired,
  clearUser: propTypes.func.isRequired,
};

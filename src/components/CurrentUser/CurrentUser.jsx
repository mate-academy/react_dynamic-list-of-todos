import React from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    currentUser: {},
  }

  componentDidMount() {
    getUserById(this.props.userId)
      .then((user) => {
        this.setState({
          currentUser: user,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUserById(this.props.userId)
        .then((user) => {
          this.setState({
            currentUser: user,
          });
        });
    }
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {currentUser.name}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{currentUser.email}</p>
        <p className="CurrentUser__phone">{currentUser.phone}</p>
        <button
          type="button"
          onClick={this.props.clearUser}
          className="TodoList__user-button--selected button"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

// import { render } from 'node-sass';
import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.updateUser(this.props.userId);
  }

  componentDidUpdate() {
    this.updateUser(this.props.userId);
  }

  updateUser(newUserId) {
    if (this.state.user && this.state.user.id === newUserId) {
      return;
    }

    getUser(newUserId)
      .then((newUser) => {
        this.setState({
          user: newUser,
        });
      })
      .catch(() => {
        this.setState({
          user: null,
        });
      });
  }

  render() {
    const { user } = this.state;
    const { id, name, email, phone } = user;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">{`Selected user:${id}`}</h2>
        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          className="CurrentUser__btn"
          onClick={() => clearUser(id)}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  clearUser: PropTypes.func.isRequired,
};

CurrentUser.defaultProps = {
  user: {},
};

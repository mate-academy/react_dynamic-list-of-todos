import React from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';
import { getUser } from '../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(userFromServer => this.setState({
        user: userFromServer,
      }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      getUser(this.props.userId)
        .then(userFromServer => this.setState({
          user: userFromServer,
        }));
    }
  }

  render() {
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
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => selectUser(0)}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

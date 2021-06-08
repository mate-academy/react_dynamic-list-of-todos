import React from 'react';
import PropTypes from 'prop-types';
import { request } from '../API/api';
import './CurrentUser.scss';

export class CurrentUser extends React.PureComponent {
  state = {
    user: request(`/users/${this.props.userId}`)
      .then(currUser => this.setState({ user: currUser })),
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      request(`/users/${this.props.userId}`)
        .then(currUser => this.setState({ user: currUser }));
    }
  }

  render() {
    const { user } = this.state;
    const { name, email, phone } = user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${this.props.userId}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          className="
            TodoList__user-button--selected
            button
            CurrentUser__clear
          "
          type="button"
          onClick={this.props.reset}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
};


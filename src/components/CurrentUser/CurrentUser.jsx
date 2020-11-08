import React from 'react';
import './CurrentUser.scss';
import Proptypes from 'prop-types';
import { getUserById } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadDate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadDate();
    }
  }

  loadDate() {
    getUserById(this.props.userId)
      .then((user) => {
        this.setState({ user: user.data });
      });
  }

  render() {
    const { user } = this.state;

    if (user === null) {
      return 'Loading...';
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {this.props.userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          className="button"
          type="button"
          onClick={this.props.onClick}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: Proptypes.number.isRequired,
  onClick: Proptypes.func.isRequired,
};

import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <div />;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {user.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          className="CurrentUser__button"
          onClick={this.props.resetUser}
        >
          Clear
        </button>
      </div>

    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  resetUser: PropTypes.func.isRequired,
};

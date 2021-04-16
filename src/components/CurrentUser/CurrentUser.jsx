import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { request } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevprops) {
    if (prevprops.userId !== this.props.userId) {
      this.getUser();
    }
  }

  async getUser() {
    const user = await request(`users/${this.props.userId}`);

    this.setState({
      user,
    });
  }

  render() {
    const { userId, onClearUser } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {userId}
          </span>
        </h2>
        <h3 className="CurrentUser__name">
          {user.name}
        </h3>
        <p className="CurrentUser__email">
          {user.email}
        </p>
        <p className="CurrentUser__phone">
          {user.phone}
        </p>
        <button
          type="button"
          onClick={onClearUser}
          className="button button--resset"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClearUser: PropTypes.func.isRequired,
};

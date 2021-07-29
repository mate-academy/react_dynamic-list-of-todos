import React from 'react';
import './CurrentUser.scss';
import propTypes from 'prop-types';

import { getUserData } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
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
    const user = await getUserData(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { userId, onClick } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${userId}`}
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
          className="button button--user"
          onClick={onClick}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
};

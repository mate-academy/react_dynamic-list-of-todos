import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    userInfo: null,
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(userInfo => this.setState({
        userInfo,
      }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    getUser(this.props.userId)
      .then(userInfo => this.setState({
        userInfo,
      }));
  }

  render() {
    const { userInfo } = this.state;

    return (!userInfo)
      ? 'No info about user'
      : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {userInfo.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{userInfo.name}</h3>
          <p className="CurrentUser__email">{userInfo.email}</p>
          <p className="CurrentUser__phone">{userInfo.phone}</p>
          <button
            type="button"
            className="CurrentUser__clear-button"
            onClick={this.props.clearInfo}
          >
            Clear info
          </button>
        </div>
      );
  }
}

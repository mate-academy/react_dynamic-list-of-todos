import React from 'react';

import { CurrentUserPropTypes } from '../PropTypes/CurrentUserPropTypes';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state={
    user: 0,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  clearUser = () => {
    this.props.selectUser(0);
  }

  async loadData() {
    const user = await this.props.getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        {!user
          ? (
            <h2 className="CurrentUser__title">
              <span>No information about the user</span>
            </h2>
          )
          : (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>
                  Selected user:
                  {user.id}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>
            </div>
          )
        }
        <button
          type="button"
          className="button"
          onClick={this.clearUser}
        >
          Clear user
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = CurrentUserPropTypes;

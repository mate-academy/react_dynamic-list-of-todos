import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api';
import { userType } from '../../propTypes/userType';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId !== userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const { userId } = this.props;

    const user = await getUser(userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          className="CurrentUser__clear button"
          onClick={() => this.props.clearUser()}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = userType.isRequired;

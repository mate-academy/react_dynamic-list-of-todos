import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../data/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    this.dataLoad();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.dataLoad();
    }
  }

  async dataLoad() {
    const response = await getUser(this.props.userId);

    this.setState({ user: response.data });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    if (!user) {
      return (
        <p>Loading data...</p>
      );
    }

    return (
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
        <button type="button" onClick={() => clearUser()}>Clear user</button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};

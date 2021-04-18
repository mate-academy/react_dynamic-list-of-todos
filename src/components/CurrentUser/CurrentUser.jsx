import React from 'react';
import { getUser } from '../../api';
import PropTypes from 'prop-types';

import './CurrentUser.scss';

export class CurrentUser extends React.PureComponent {
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
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        { user !== null
          ? (
            <div className="CurrentUser">
              <button
                className="btn btn-outline-danger"
                onClick={this.props.clearUser}
                type="button"
              >
                Clear
              </button>
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
          : 'No user found'}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { getUserId } from '../api';

import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevUser) {
    if (prevUser.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  loadUser() {
    getUserId(this.props.userId)
      .then((user) => {
        this.setState({
          user: { ...user.data },
        });
      });
  }

  render() {
    const { user } = this.state;
    const { userId } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Select user:
            {userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <p>
          <button
            className="clear_button_cur_user"
            type="button"
            onClick={() => this.props.selectUser(0)}
          >
            Clear
          </button>
        </p>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  selectUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

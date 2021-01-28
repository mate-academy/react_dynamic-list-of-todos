import React from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';
import { getUsers } from '../../api/api';

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
    const user = await getUsers(this.props.userId);

    this.setState({ user: user.data });
  }

  render() {
    const { user } = this.state;
    const { onClear } = this.props;

    if (!user) {
      return null;
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

        <button
          className="CurrentUser__clear button"
          type="button"
          onClick={() => onClear()}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};

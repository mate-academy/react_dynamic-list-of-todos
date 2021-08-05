import React from 'react';
import propTypes from 'prop-types';
import './CurrentUser.scss';
import { getUsers } from '../../api';

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

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { onClear } = this.props;

    if (!user) {
      return ('Choose user');
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${this.props.userId}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name || user.username}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          onClick={onClear}
          className="btn btn-outline-secondary"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: propTypes.number.isRequired,
  onClear: propTypes.func.isRequired,
};

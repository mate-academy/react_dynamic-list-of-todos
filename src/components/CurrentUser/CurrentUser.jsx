import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { request } from '../../api/api';

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

  loadData() {
    const { userId } = this.props;

    request(`/users/${userId}`)
      .then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    const { onDeselect } = this.props;

    if (!user) {
      return (
        <h2>
          Loading
        </h2>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.adress}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          className="button"
          type="button"
          onClick={onDeselect}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onDeselect: PropTypes.func.isRequired,
};

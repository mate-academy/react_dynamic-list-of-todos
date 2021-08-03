import React from 'react';
import PropTypes from 'prop-types';
import { loadData } from '../../utils';

import './CurrentUser.scss';

export class CurrentUser extends React.PureComponent {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadUser();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user = await loadData(`/users/${this.props.userId}/`);

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    if (!user) {
      return `No user selected`;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          className="button"
          type="button"
          onClick={() => clearUser()}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};

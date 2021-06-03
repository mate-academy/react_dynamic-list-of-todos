import React from 'react';
import PropTypes from 'prop-types';
import { getAll } from '../../api/users';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.getUser();
    }
  }

  getUser = () => {
    getAll('users', `/${this.props.userId}`)
      .then(({ data }) => this.setState({ user: { ...data } }));
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">
          {user.name}
        </h3>
        <a
          className="CurrentUser__email"
          href={`mailto:${user.email}`}
        >
          {user.email}
        </a>
        <a
          className="CurrentUser__phone"
          href={`tel:${user.phone}`}
        >
          {user.phone}
        </a>
        <button
          className="CurrentUser__clear"
          type="button"
          onClick={clearUser}
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

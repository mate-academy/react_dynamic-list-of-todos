import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(user => this.setState({ user }));
    }
  }

  render() {
    const { clearUser } = this.props;
    const { user } = this.state;

    return (

      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {user && user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user && user.name}</h3>
        <p className="CurrentUser__email">{user && user.email}</p>
        <p className="CurrentUser__phone">{user && user.phone}</p>
        <button
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
  clearUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

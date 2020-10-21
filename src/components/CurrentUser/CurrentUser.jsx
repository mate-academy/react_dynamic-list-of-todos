import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevState) {
    if (prevState.selectedUserId !== this.props.selectedUserId) {
      this.loadUser();
    }
  }

  loadUser() {
    getUser(this.props.selectedUserId).then((data) => {
      this.setState({ user: { ...data.data } });
    });
  }

  render() {
    const { user } = this.state;
    const { selectUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user:${user.id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          className="randomize"
          type="button"
          onClick={() => selectUser(0)}
        >
          Clear user details!
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

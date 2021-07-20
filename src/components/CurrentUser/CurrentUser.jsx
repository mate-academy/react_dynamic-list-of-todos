import React from 'react';
import PropTypes from 'prop-types';
import { getUserInfoApi } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate({ userId }) {
    if (userId !== this.props.userId) {
      this.getUser();
    }
  }

  getUser = () => {
    getUserInfoApi(this.props.userId)
      .then(response => response.data)
      .then(userFromApi => (
        this.setState({
          user: userFromApi,
        })
      ));
  };

  render() {
    const { user } = this.state;
    const { clearSelectedUser } = this.props;

    if (!user) {
      return (
        <>
          <h3>No info :(</h3>
          <button
            type="button"
            onClick={clearSelectedUser}
          >
            clear celected user :)
          </button>
        </>
      );
    }

    const { id, email, phone, name } = user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          onClick={clearSelectedUser}
        >
          clear celected user :)
        </button>
      </div>
    );
  }
};

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
};

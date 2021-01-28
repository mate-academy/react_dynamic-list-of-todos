import React from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    id: 0,
    name: '',
    email: '',
    phone: '',
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId && this.state) {
      this.loadUser();
    }
  }

  loadUser = async() => {
    try {
      const user = await getUser(this.props.userId);

      this.setState({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        error: false,
      });
    } catch (error) {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { id, name, email, phone, error } = this.state;

    if (error) {
      return <p>--User-not-found--</p>;
    }

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
          className="CurrentUser__button"
          onClick={this.props.clearUser}
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

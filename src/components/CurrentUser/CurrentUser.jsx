import React from 'react';
import PropTypes from 'prop-types';
import { getSelectedUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    name: null,
    email: null,
    phone: null,
  }

  componentDidMount() {
    this.getUserInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    this.getUserInfo();
  }

  getUserInfo = () => {
    getSelectedUser(this.props.userId)
      .then((user) => {
        this.setState({
          name: user.name,
          email: user.email,
          phone: user.phone,
        });
      });
  }

  render() {
    const { name, email, phone } = this.state;
    const { userId, onUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          type="button"
          onClick={() => onUser(0)}
          className="button"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onUser: PropTypes.func.isRequired,
};

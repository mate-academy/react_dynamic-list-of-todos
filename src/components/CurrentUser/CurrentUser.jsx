import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    userId: '',
    userName: '',
    userEmail: '',
    userPhone: '',
  };

  componentDidMount() {
    if (this.props.userId !== 0) {
      getUser(this.props.userId).then(user => (
        this.setState({
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone,
        })
      ));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      getUser(this.props.userId).then(user => (
        this.setState({
          userId: user.id,
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone,
        })
      ));
    }
  }

  render() {
    const {
      userId,
      userName,
      userEmail,
      userPhone,
    } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${userId}`}</span>
        </h2>
        <h3 className="CurrentUser__name">{userName}</h3>
        <p className="CurrentUser__email">{userEmail}</p>
        <p className="CurrentUser__phone">{userPhone}</p>
        <button
          type="button"
          onClick={() => this.props.setUserId(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  setUserId: PropTypes.func.isRequired,
};

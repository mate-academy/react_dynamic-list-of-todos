import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsers } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: '',
  };

  componentDidMount() {
    this.userInfo();
  }

  componentDidUpdate(prevState) {
    if (prevState.userId !== this.props.userId) {
      this.userInfo();
    }
  }

  userInfo = () => {
    getUsers(this.props.userId)
      .then((user) => {
        this.setState({ user: user.data });
      });
  };

  render() {
    const {
      id,
      name,
      email,
      phone,
    } = this.state.user;

    const { onClear } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {name}
        </h3>
        <p className="CurrentUser__email">
          {email}
        </p>
        <p className="CurrentUser__phone">
          {phone}
        </p>
        <button
          type="button"
          className="button CurrentUser__clear"
          onClick={onClear}
        >
          clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
};

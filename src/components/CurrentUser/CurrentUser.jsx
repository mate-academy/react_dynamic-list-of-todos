import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const { userId } = this.props;

    getUser(userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    const { userId } = this.props;

    getUser(userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  render() {
    const { name, email, phone, id } = this.state.user;
    const { onRemoveUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          type="button"
          className="CurrentUser__clear button"
          onClick={onRemoveUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  onRemoveUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

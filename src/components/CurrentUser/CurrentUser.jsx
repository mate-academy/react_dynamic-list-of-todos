import React from 'react';
import './CurrentUser.scss';

import PropTypes from 'prop-types';

import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const { userId } = this.props;

    getUser(userId)
      .then(({ data }) => {
        this.setState({ user: { ...data } });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    const { userId } = this.props;

    getUser(userId)
      .then(({ data }) => {
        this.setState({ user: { ...data } });
      });
  }

  render() {
    const { id, name, email, phone } = this.state.user;
    const { onClearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected User: #${id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          className="CurrentUser__clear button"
          type="button"
          onClick={onClearUser}
        >
          Clear
        </button>

      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClearUser: PropTypes.func.isRequired,
};

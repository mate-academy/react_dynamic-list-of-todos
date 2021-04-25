import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = { user: null };

  componentDidMount() {
    getUser(this.props.userId)
      .then((result) => {
        this.setState({ user: result.data });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then((result) => {
          this.setState({ user: result.data });
        });
    }
  }

  render() {
    const { userId, selectUser } = this.props;

    if (!this.state.user) {
      return <h1>Hello</h1>;
    }

    const { name, email, phone } = this.state.user;

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
          className="CurrentUser__user-button button"
          type="button"
          onClick={() => selectUser(0)}
        >
          Clear user
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

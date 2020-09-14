import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    getUser(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    getUser(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  render() {
    const { user } = this.state;
    const { userId, clear } = this.props;

    return (!user)
      ? 'Empty'
      : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {userId}
            </span>
            <button
              className="button button-clear"
              type="button"
              onClick={clear}
            >
              Clear
            </button>
          </h2>
          <h3 className="CurrentUser__name">{this.state.user.name}</h3>
          <p className="CurrentUser__email">{this.state.user.email}</p>
          <p className="CurrentUser__phone">{this.state.user.phone}</p>
        </div>
      );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
};

CurrentUser.defaultProps = {
  user: {},
};

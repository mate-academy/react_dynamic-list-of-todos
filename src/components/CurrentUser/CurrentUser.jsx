import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    await this.loadUser();
  }

  async componentDidUpdate(prevState, prevProps) {
    if (prevProps.userId !== this.props.userId) {
      await this.loadUser();
    }
  }

  async loadUser() {
    const selectedUser = await getUser(this.props.userId);

    this.setState({ user: selectedUser.data });
  }

  render() {
    const { userId, clear } = this.props;
    const { user } = this.state;

    if (!user) {
      return <div>Something went wrong...</div>;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {user.name}
        </h3>
        <p className="CurrentUser__email">
          {user.email}
        </p>
        <p className="CurrentUser__phone">
          {user.phone}
        </p>
        <button
          type="button"
          className="button CurrentUser__clear"
          onClick={clear}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
};

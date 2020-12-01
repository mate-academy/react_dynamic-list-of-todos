import React from 'react';
import './CurrentUser.scss';
import { PropTypes } from 'prop-types';
import { getUsers } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
    currentId: 0,
  }

  componentDidMount() {
    this.addUser();
  }

  componentDidUpdate() {
    if (this.props.userId !== this.state.currentId) {
      this.addUser();
    }
  }

  addUser = async() => {
    const { userId } = this.props;
    const user = await getUsers(userId);

    if (!user) {
      return;
    }

    this.setState({
      user,
      currentId: userId,
    });
  }

  render() {
    const { name, email, phone } = this.state.user;
    const { userId, handleClear } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${userId}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          className="button__clear"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>

    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  handleClear: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUserData } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadData();
    // console.log(user);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props.todoId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUserData(this.props.todoId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <div className="
          text-center
          CurrentUser__spinner-position
          "
        >
          <div
            className="
              spinner-grow
              text-success
              CurrentUser__spinner-config
              "
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  todoId: PropTypes.number.isRequired,
};

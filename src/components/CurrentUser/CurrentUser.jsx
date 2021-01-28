/* eslint-disable */
import React from 'react';
import './CurrentUser.scss';
import {getTodos, getUser, getUsers} from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: [],
  };

  async componentDidMount() {
    const user = await getUser(this.props.userId);
    this.setState({ user });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userId !== this.props.userId) {
      const user = await getUser(this.props.userId);
      if (user.name === null) {
        return <p>Loading profile...</p>;
      } else {
        return this.setState({ user });
      }
    }
  }

  render() {
    const { deleteUser } = this.props;
    const { user } = this.state;
    console.log(user);

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>Selected user: {this.props.userId}</span></h2>

          <h3 className="CurrentUser__name">{!user.name ? '' : user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
        <button
          onClick={deleteUser}
          type="button"
          className="button is-link"
        >
          Clear
        </button>
      </>
    );
  }
}

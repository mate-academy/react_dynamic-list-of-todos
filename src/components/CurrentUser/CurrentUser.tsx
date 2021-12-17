/* eslint-disable no-console */
import React from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api/api';

type Props = {
  userId: number;
  clearUser: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state:State = {
    user: null,
  };

  componentDidMount() {
    this.loadCurrentUser();
  }

  componentDidUpdate(prevProp: Props) {
    if (prevProp.userId !== this.props.userId) {
      this.loadCurrentUser();
    }
  }

  loadCurrentUser() {
    getUsers(this.props.userId)
      .then(user => {
        this.setState({ user });
      })
      .catch(error => {
        console.warn(error);
      });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>
        )}
        <button
          type="button"
          onClick={this.props.clearUser}
          className="
          button
          button--clear
          TodoList__user-button--selected"
        >
          Clear
        </button>
      </>
    );
  }
}

import React from 'react';
import './CurrentUser.scss';
import { User } from '../../Types/User';
import { getUser } from '../../API/api';

type Props = {
  UserId: number,
};

type State = {
  currentUser: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    getUser(this.props.UserId).then(
      result => (this.setState({ currentUser: result })),
    );
  }

  componentDidUpdate() {
    getUser(this.props.UserId).then(
      result => (this.setState({ currentUser: result })),
    );
  }

  setCurrentUser(user: User) {
    this.setState({ currentUser: user });
  }

  render(): React.ReactNode {
    const { currentUser } = this.state;

    if (!currentUser) {
      return (
        <p>No user selected</p>
      );
    }

    const {
      id,
      name,
      email,
      phone,
    } = currentUser;

    return (
      <div className="CurrentUser">
        {currentUser && (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${id}`}</span></h2>
            <h3 className="CurrentUser__name">{name}</h3>
            <p className="CurrentUser__email">{email}</p>
            <p className="CurrentUser__phone">{phone}</p>
          </>
        )}
      </div>
    );
  }
}

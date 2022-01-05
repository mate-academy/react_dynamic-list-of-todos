import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

interface Props {
  userId: number,
}

interface State {
  user: User,
}

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: null,
  };

  componentDidMount() {
    this.userFromServer();
  }

  componentDidUpdate(prevProps: { userId: number }) {
    if (prevProps.userId !== this.props.userId) {
      this.userFromServer();
    }
  }

  userFromServer() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return 'No users download';
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}

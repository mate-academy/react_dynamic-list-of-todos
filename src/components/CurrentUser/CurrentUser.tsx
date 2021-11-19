import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  userId: number,
}

interface State {
  user: User,
}

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {} as User,
  };

  componentDidMount() {
    this.loadUserDate();
  }

  componentDidUpdate(prevProps: { userId: number; }) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserDate();
    }
  }

  loadUserDate() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { userId } = this.props;
    const { user } = this.state;

    if (!user) {
      return 'Dont loadded';
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${userId}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}

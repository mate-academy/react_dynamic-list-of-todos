import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api';

type Props = {
  userId: number,
  removeUser: () => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.loadUserData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserData();
    }
  }

  async loadUserData() {
    const user: User = await getUser(this.props.userId);

    this.setState({
      user,
    });
  }

  render(): React.ReactNode {
    if (!this.state.user) {
      return (
        <span>No user was founded</span>
      );
    }

    const {
      id, name, email, phone,
    } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${id}`}</span></h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          className="button"
          type="button"
          onClick={() => this.props.removeUser()}
        >
          Clear
        </button>
      </div>
    );
  }
}

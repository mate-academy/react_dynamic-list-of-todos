import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api/api';

type User = {
  id: number,
  name: string,
  email: string,
  phone: number,
};

type Props = {
  currentUserId: number;
  clearSelectedUser: () => void;
};

type State = {
  currentUser: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    currentUser: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.currentUserId !== this.props.currentUserId) {
      this.loadUser();
    }
  }

  loadUser = () => {
    getUserById(this.props.currentUserId)
      .then(currentUser => {
        this.setState({ currentUser });
      });
  };

  render() {
    const { currentUser } = this.state;
    const { clearSelectedUser } = this.props;

    return currentUser && (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${currentUser.id}`}</span>
        </h2>
        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{currentUser.email}</p>
        <p className="CurrentUser__phone">{currentUser.phone}</p>
        <button
          className="CurrentUser__clear button"
          type="button"
          onClick={clearSelectedUser}
        >
          Hide User
        </button>
      </div>
    );
  }
}

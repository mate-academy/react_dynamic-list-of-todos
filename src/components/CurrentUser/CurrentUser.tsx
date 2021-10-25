import React from 'react';
import { getUser } from '../../api';
import { User } from '../../types';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  clear: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadSelectedUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadSelectedUser();
    }
  }

  loadSelectedUser = () => {
    getUser(`${this.props.selectedUserId}`)
      .then(userFromServer => {
        this.setState({ user: userFromServer });
      });
  };

  render() {
    const { user } = this.state;

    const { clear } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${user && user.id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user && user.name}</h3>
        <p className="CurrentUser__email">{user && user.email}</p>
        <p className="CurrentUser__phone">{user && user.phone}</p>
        <button
          className="CurrentUser__button"
          type="button"
          onClick={
            () => clear()
          }
        >
          clear
        </button>
      </div>
    );
  }
}

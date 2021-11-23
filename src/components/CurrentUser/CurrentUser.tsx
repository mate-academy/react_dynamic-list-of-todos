import React from 'react';
import { getUserById } from '../../api/api';
import { User } from '../../types/User';
import './CurrentUser.scss';

interface Props {
  userId: number,
  clearUser: () => void,
}

interface State {
  selectedUser: User | null,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    selectedUser: null,
  };

  componentDidMount() {
    getUserById(this.props.userId)
      .then((user) => this.setState({ selectedUser: user }));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      getUserById(this.props.userId)
        .then((user) => this.setState({ selectedUser: user }));
    }
  }

  render() {
    const { selectedUser } = this.state;
    const { userId, clearUser } = this.props;

    return (
      selectedUser === undefined
        ? `Can't find user by id ${userId}`
        : (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${selectedUser?.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
            <p className="CurrentUser__email">{selectedUser?.email}</p>
            <p className="CurrentUser__phone">{selectedUser?.phone}</p>
            <button
              className="CurrentUser__clear"
              type="button"
              onClick={() => clearUser()}
            >
              Clear User
            </button>
          </div>
        )
    );
  }
}

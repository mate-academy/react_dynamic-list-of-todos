import React from 'react';
import { getUsers } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  selectUser: (id: number) => void;
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    getUsers(this.props.selectedUserId)
      .then(user => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      getUsers(this.props.selectedUserId)
        .then(user => {
          this.setState({ user });
        });
    }
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

            <button
              type="button"
              className="CurrentUser__clear"
              onClick={() => this.props.selectUser(0)}
            >
              Clear
            </button>
          </div>
        )}
      </>
    );
  }
}

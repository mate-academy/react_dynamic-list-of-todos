import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

interface Props {
  selectedUserId: number;
  clearUser: () => void;
}

interface State {
  user: null | User;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getUserForUserId(this.props.selectedUserId);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.getUserForUserId(this.props.selectedUserId);
    }
  }

  getUserForUserId = (userId : number) => {
    getUser(userId)
      .then(user => {
        this.setState({
          user,
        });
      });
  };

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
              className="button CurrentUser__clear"
              onClick={this.props.clearUser}
            >
              Clear User
            </button>
          </div>
        )}
      </>
    );
  }
}

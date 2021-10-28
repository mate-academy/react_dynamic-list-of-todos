import React from 'react';
import { getUsers } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  resetUser: () => void,
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  loadUser = () => {
    getUsers(this.props.userId)
      .then(userFromServer => {
        this.setState({ user: userFromServer });
      });
  };

  render() {
    const { user } = this.state;

    return (
      user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            className="CurrentUser__button"
            type="button"
            onClick={
              () => this.props.resetUser()
            }
          >
            clear
          </button>
        </div>
      ) : (
        <p>
          User is not found
        </p>
      )
    );
  }
}

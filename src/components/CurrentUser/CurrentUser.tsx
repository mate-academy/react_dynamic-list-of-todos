import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

interface State {
  user: User | null;
}

type Props = {
  selectedUserId: number,
  clearUser:() => void
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadDataUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadDataUser();
    }
  }

  loadDataUser() {
    getUser(this.props.selectedUserId)
      .then(user => {
        this.setState({ user });
      })
      .catch(() => {
        this.setState({ user: null });
      });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    if (!user) {
      return (
        <div className="error">
          an error occurred when loading user
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <button
          className="CurrentUser__button"
          type="button"
          onClick={() => clearUser()}
        >
          Clear
        </button>
        <h2 className="CurrentUser__title">
          <span>
            Selected user: #
            {user.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}

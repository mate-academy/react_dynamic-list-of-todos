import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';
import { User } from '../../types/types';

interface Props {
  selectedUserId: number;
  clearSelectedUser: () => void;
}

interface State {
  user: User | null;
  isUserLoaded: boolean;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    isUserLoaded: false,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadData();
    }
  }

  async loadData() {
    try {
      const user = await getUser(this.props.selectedUserId);

      this.setState({
        user,
        isUserLoaded: true,
      });
    } catch (error) {
      this.setState({ isUserLoaded: false });
    }
  }

  render() {
    const { user, isUserLoaded } = this.state;
    const { clearSelectedUser } = this.props;

    return (
      <div className="CurrentUser">
        {user && isUserLoaded ? (
          <>
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="button"
              onClick={clearSelectedUser}
            >
              Clear
            </button>
          </>
        ) : 'User is not found'}
      </div>
    );
  }
}

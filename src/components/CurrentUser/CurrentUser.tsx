import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number,
  clearUser: () => void,
}

interface State {
  user: User | null,
  loadDataError: boolean,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    loadDataError: false,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    const { selectedUserId } = this.props;

    if (prevProps.selectedUserId !== selectedUserId) {
      this.loadData();
    }
  }

  loadData = async () => {
    try {
      const { selectedUserId } = this.props;
      const user = await getUser(selectedUserId);

      this.setState({
        user, loadDataError: false,
      });
    } catch (error) {
      this.setState({
        user: null, loadDataError: true,
      });
    }
  };

  render() {
    const { user, loadDataError } = this.state;
    const { selectedUserId, clearUser } = this.props;

    return (
      <>
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${selectedUserId}`}</span>
            </h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="CurrentUser__clear button"
              onClick={clearUser}
            >
              Clear
            </button>
          </div>
        )}
        {loadDataError && (
          <p className="CurrentUser__error-message">User not found</p>
        )}
      </>
    );
  }
}

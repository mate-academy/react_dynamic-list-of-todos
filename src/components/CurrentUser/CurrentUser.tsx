import React from 'react';
import { getUser } from '../../api/Todo';

import './CurrentUser.scss';

type Props = {
  userId: number,
  clearUser: () => void,
};

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
    const { userId } = this.props;

    if (prevProps.userId !== userId) {
      this.loadData();
    }
  }

  loadData = async () => {
    try {
      const { userId } = this.props;
      const user = await getUser(userId);

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
    const { userId, clearUser } = this.props;

    return (
      <>
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${userId}`}</span>
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
          <p>User not found</p>
        )}
      </>
    );
  }
}

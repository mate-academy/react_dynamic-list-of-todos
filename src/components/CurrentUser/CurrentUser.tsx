import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  clear: () => void,
};

type State = {
  user: User | null,
  isUser: boolean,
};

export class CurrentUser extends React.PureComponent<Props, State> {
  state: State = {
    user: null,
    isUser: false,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const { userId } = this.props;

    try {
      const user = await getUser(String(userId));

      this.setState({
        user,
        isUser: true,
      });
    } catch (error) {
      this.setState({ isUser: false });
    }
  }

  render() {
    const { user, isUser } = this.state;
    const { clear } = this.props;

    return (
      <div className="CurrentUser">
        {user ? (
          <>
            {isUser ? (
              <>
                <h2 className="CurrentUser__title">
                  <span>
                    Selected user:
                    {' '}
                    {user.id}
                  </span>
                </h2>

                <h3 className="CurrentUser__name">{user.name}</h3>
                <p className="CurrentUser__email">{user.email}</p>
                <p className="CurrentUser__phone">{user.phone}</p>
              </>
            ) : (
              <h3 className="CurrentUser__name">User is not defined</h3>
            )}
            <button
              className="button CurrentUser__clear"
              type="button"
              onClick={clear}
            >
              Clear
            </button>
          </>
        ) : (
          <>
            <h3 className="CurrentUser__name">User is not defined</h3>
            <button
              className="button CurrentUser__clear"
              type="button"
              onClick={clear}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}

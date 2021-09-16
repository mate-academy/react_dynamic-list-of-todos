import React from 'react';
import { loadUsers } from '../../api/api';
import './CurrentUser.scss';

type State = {
  user: User | null,
  errorMessage: string,
};

type Props = {
  userId: number,
  onClearUserId: () => void,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    errorMessage: '',
  };

  componentDidMount() {
    this.getLoadedData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.getLoadedData();
    }
  }

  async getLoadedData() {
    try {
      const { userId } = this.props;
      const user = await loadUsers(userId);

      this.setState(() => ({
        user, errorMessage: '',
      }));
    } catch (error) {
      this.setState({ errorMessage: 'There is no such user' });
    }
  }

  render() {
    const { user, errorMessage } = this.state;
    const { onClearUserId } = this.props;

    if (!user) {
      throw new Error('Unable to load data Check your connection');
    }

    return (
      <>
        {!errorMessage ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              className="TodoList__user-button--selected button"
              onClick={() => onClearUserId()}
            >
              Clear
            </button>
          </div>
        ) : errorMessage}
      </>
    );
  }
}

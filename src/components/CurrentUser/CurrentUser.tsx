import React from 'react';
import './CurrentUser.scss';

import cn from 'classnames';
import { getUserFromServer } from '../../api';
import { Loader } from '../Loader';

type Props = {
  userId: number,
  selectUserHandler: (userId: string) => void,
};

type State = {
  user: User | null,
  isNoUserErrorVisible: boolean,
  loading: boolean,
};

export class CurrentUser extends React.PureComponent<Props, State> {
  state: State = {
    user: null,
    isNoUserErrorVisible: false,
    loading: false,
  };

  componentDidMount() {
    this.selectUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      await this.selectUser();
    }
  }

  clear = () => {
    this.props.selectUserHandler('0');

    this.setState({
      user: null,
    });
  };

  async selectUser() {
    this.setState({ loading: true });

    try {
      const user: User = await getUserFromServer(this.props.userId);

      this.setState({
        user,
        isNoUserErrorVisible: false,
      });
    } catch (error) {
      this.setState({ isNoUserErrorVisible: true });
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  }

  render() {
    const { user, isNoUserErrorVisible, loading } = this.state;

    if (loading) {
      return (
        <Loader />
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className={cn(
          'CurrentUser__title',
          { 'CurrentUser__title--error': isNoUserErrorVisible },
        )}
        >
          <span>
            {isNoUserErrorVisible
              ? 'Error: Can not find the user!'
              : `Selected user: ${user?.id}`}
          </span>
        </h2>

        {!isNoUserErrorVisible && (
          <>
            <h3 className="CurrentUser__name">{user?.name}</h3>
            <p className="CurrentUser__email">{user?.email}</p>
            <p className="CurrentUser__phone">{user?.phone}</p>
          </>
        )}

        <div className="CurrentUser__button">
          <button
            className="button"
            type="button"
            onClick={this.clear}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

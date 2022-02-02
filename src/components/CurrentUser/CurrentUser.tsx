import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api';

type Props = {
  userId: number,
  clearUser: () => void,
};

type State = {
  user: User | null,
  isNoUserErrorVisible: boolean,
};

export class CurrentUser extends React.PureComponent<Props, State> {
  state: State = {
    user: null,
    isNoUserErrorVisible: false,
  };

  async componentDidMount() {
    this.selectUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      await this.selectUser();
    }
  }

  clear = () => {
    this.setState({
      user: null,
    });

    this.props.clearUser();
  };

  async selectUser() {
    try {
      const user: User = await getUser(this.props.userId);

      this.setState({
        user,
        isNoUserErrorVisible: false,
      });
    } catch (error) {
      this.setState({ isNoUserErrorVisible: true });
    }
  }

  render() {
    const { user, isNoUserErrorVisible } = this.state;

    return (
      <div>
        {isNoUserErrorVisible && (
          <div>
            <h2
              className="CurrentUser__title CurrentUser__title--error"
            >
              <span>Error: Can not find the user!</span>
            </h2>
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
        )}
        {!isNoUserErrorVisible && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

            <h3 className="CurrentUser__name">{user?.name}</h3>
            <p className="CurrentUser__email">{user?.email}</p>
            <p className="CurrentUser__phone">{user?.phone}</p>
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
        )}
      </div>
    );
  }
}

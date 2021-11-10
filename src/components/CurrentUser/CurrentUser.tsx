import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number,
  resetUser: (userId?: number) => void,
};

type State = {
  userInfo: User,
  isLoaded: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    userInfo: {} as User,
    isLoaded: false,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    this.setState({ isLoaded: false });

    const userInfo = await getUser(this.props.userId);

    this.setState({
      userInfo,
      isLoaded: true,
    });
  }

  render() {
    const {
      id, name, email, phone,
    } = this.state.userInfo;

    return (
      <div className="CurrentUser">
        {this.state.isLoaded ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {' '}
                {id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">
              {name}
            </h3>
            <p className="CurrentUser__email">
              {email}
            </p>
            <p className="CurrentUser__phone">
              {phone}
            </p>
            <button
              type="button"
              className="CurrentUser__clear button"
              onClick={() => {
                this.props.resetUser();
              }}
            >
              Clear
            </button>
          </>
        ) : (
          <h2 className="CurrentUser__title">
            <span>
              Loading user data
            </span>
          </h2>
        )}
      </div>
    );
  }
}

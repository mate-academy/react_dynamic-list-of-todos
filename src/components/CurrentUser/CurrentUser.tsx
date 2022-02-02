import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  currentUserId: number,
  clearUser: () => void,
};

type State = {
  user: User | null,
  isError: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    isError: false,
  };

  componentDidMount() {
    this.newUser();
  }

  componentDidUpdate(prevProps: Props) {
    // eslint-disable-next-line no-console
    console.log(this.props.currentUserId);
    if (this.props.currentUserId !== prevProps.currentUserId) {
      this.newUser();
    }
  }

  async newUser() {
    try {
      const user = await getUser(this.props.currentUserId);

      this.setState({ user, isError: false });
    } catch (error) {
      this.setState({ isError: true });
    }
  }

  render() {
    return (
      <>
        {!this.state.isError
          ? (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title"><span>{`Selected user: ${this.state.user?.id}`}</span></h2>

              <h3 className="CurrentUser__name">{this.state.user?.name}</h3>
              <p className="CurrentUser__email">{this.state.user?.email}</p>
              <p className="CurrentUser__phone">{this.state.user?.phone}</p>
              <button
                type="button"
                className="button"
                onClick={this.props.clearUser}
              >
                Clear User
              </button>
            </div>
          )
          : <p>User Not Found</p>}
      </>
    );
  }
}

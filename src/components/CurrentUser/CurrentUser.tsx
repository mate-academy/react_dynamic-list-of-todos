import React from 'react';
import './CurrentUser.scss';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  userId: number,
  clearUserInfo: () => void,
};

type State = {
  user: User,
  isUserValid: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: {
      id: 0,
      name: '',
      email: '',
      phone: '',
    },
    isUserValid: true,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    try {
      const user = await getUser(this.props.userId);

      this.setState({ user, isUserValid: true });
    } catch (error) {
      this.setState({ isUserValid: false });
    }
  }

  render() {
    return (
      <div className="CurrentUser">
        {this.state.isUserValid
          ? (
            <div>
              <h2 className="CurrentUser__title">
                <span>
                  Selected user:
                  {this.state.user.id}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{this.state.user.name}</h3>
              <p className="CurrentUser__email">{this.state.user.email}</p>
              <p className="CurrentUser__phone">{this.state.user.phone}</p>
              <button className="button" type="button" onClick={this.props.clearUserInfo}>Clear</button>
            </div>
          )
          : <h1>User not found</h1>}
      </div>
    );
  }
}

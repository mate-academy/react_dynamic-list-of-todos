import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  userId: number,
  clearUserInfo: () => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.showUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      this.showUser();
    }
  }

  async showUser() {
    try {
      const user = await getUser(this.props.userId);

      this.setState({ user });
    } catch (error) {
      throw new Error(`error ${error}`);
    }
  }

  render() {
    if (this.state.user) {
      const {
        id, name, email, phone,
      } = this.state.user;

      return (
        <div className="CurrentUser">
          <div>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{name}</h3>
            <p className="CurrentUser__email">{email}</p>
            <p className="CurrentUser__phone">{phone}</p>
            <button
              className="button"
              type="button"
              onClick={this.props.clearUserInfo}
            >
              Clear
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        Loading data...
      </div>
    );
  }
}

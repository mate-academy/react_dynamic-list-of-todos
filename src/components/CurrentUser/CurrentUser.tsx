import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  userId: number,
  onClear: () => void,
};

type State = {
  user: User | null,
  userError: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {} as User,
    userError: false,
  };

  async componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      this.loadUser();
    }
  }

  loadUser = async () => {
    try {
      const user = await getUser(this.props.userId);

      this.setState({
        user,
        userError: false,
      });
    } catch {
      this.setState({
        userError: true,
      });
    }
  };

  render() {
    return (
      !this.state.userError ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {this.state.user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {this.state.user.name}
          </h3>

          <p className="CurrentUser__email">
            {this.state.user.email}
          </p>

          <p className="CurrentUser__phone">
            {this.state.user.phone}
          </p>

          <button
            type="button"
            className="button"
            onClick={() => {
              this.props.onClear();
            }}
          >
            Clear user
          </button>
        </div>
      )
        : (
          `User id #${this.props.userId} not found`
        )
    );
  }
}

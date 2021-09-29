import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

interface Props {
  userId: number;
  clear: () => void;
}

interface State {
  user: User | null,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.getCurrentUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.getCurrentUser();
    }
  }

  async getCurrentUser() {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <div>User not found</div>
      );
    }

    return (
      <>
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {user.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              className="
                CurrentUser__button
                button
              "
              type="button"
              onClick={this.props.clear}
            >
              Clear
            </button>
          </div>
        )}
      </>
    );
  }
}

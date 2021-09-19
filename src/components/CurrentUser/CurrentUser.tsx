import React from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api/api';

type Props = {
  userId: number;
  reset: () => void;
};

type State = {
  user: User | null
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.currentUser(this.props.userId);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.currentUser(this.props.userId);
    }
  }

  async currentUser(userId: number) {
    const user = await getUsers(userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      user && (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name">
              {user.name}
            </h3>
            <p className="CurrentUser__email">
              {user.email}
            </p>
            <p className="CurrentUser__phone">
              {user.phone}
            </p>
          </div>
          <button
            type="button"
            className="button CurrentUser__clear"
            onClick={this.props.reset}
          >
            reset
          </button>
        </>
      )
    );
  }
}

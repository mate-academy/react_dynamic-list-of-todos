import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number,
  removeUser: () => void;
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
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
    const user: User = await getUser(this.props.userId);

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    const { removeUser } = this.props;

    return (
      <>
        { user ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {user.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name" data-cy="userName">
              {user.name}
            </h3>
            <p className="CurrentUser__email">
              {user.email}
            </p>
            <p className="CurrentUser__phone">
              {user.phone}
            </p>
            <button
              type="button"
              onClick={removeUser}
            >
              Clear
            </button>
          </div>
        )
          : <p style={{ color: 'red' }}> User not found </p>}
      </>
    );
  }
}

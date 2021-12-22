import React from 'react';

import { User } from '../../react-app-env';
import { getUsers } from '../../api';

import './CurrentUser.scss';

type Props = {
  userId: number;
  clear: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.PureComponent<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps: { userId: number; }) {
    if (prevProps.userId !== this.props.userId) {
      this.load();
    }
  }

  async load() {
    const user = await getUsers(this.props.userId);

    this.setState({ user });
  }

  render(): React.ReactNode {
    const { clear } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        {user && (
          <>
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
              type="button"
              className="CurrentUser__clear"
              onClick={clear}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}

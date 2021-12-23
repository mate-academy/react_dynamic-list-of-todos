import React from 'react';
import { getUsers } from '../../api/api';
import { User } from '../../react-app-env';

import './CurrentUser.scss';

type Props = {
  userId: number;
  onClear: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: { userId: number; }) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUsers(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { onClear } = this.props;

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
              className="CurrentUser__clear button"
              type="button"
              onClick={onClear}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}

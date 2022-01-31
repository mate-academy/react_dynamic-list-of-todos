/* eslint-disable no-console */
import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type State = {
  user: User | null,
};

type Props = {
  selectedUser: number;
  clearUserId: (arg: number) => void;
};

export class CurrentUser extends React.Component<Props> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    return this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedUser !== prevProps.selectedUser) {
      this.loadUser();
    }
  }

  loadUser = async () => {
    const user = await getUser(this.props.selectedUser);

    this.setState({
      user,
    });
  };

  render() {
    const { user } = this.state;
    const { clearUserId } = this.props;

    return (
      user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {user?.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          <button
            type="button"
            onClick={() => clearUserId(0)}
          >
            Clear
          </button>
        </div>
      ) : (
        <h1>Нет информации</h1>
      )
    );
  }
}

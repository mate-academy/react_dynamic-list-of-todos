import React from 'react';
import './CurrentUser.scss';

import { getUserById } from '../../api/api';

type State = {
  user: User | null;
};

type Props = {
  userId: number;
  clearUser: () => void;
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
    const { userId } = this.props;
    const user = await getUserById(userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser box">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>

        <button
          className="button is-info"
          type="button"
          onClick={clearUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

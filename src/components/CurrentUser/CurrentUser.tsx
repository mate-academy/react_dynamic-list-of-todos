import React from 'react';
import { getUsers } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  id: number;
  clear: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, {}> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.id !== this.props.id) {
      this.getUser();
    }
  }

  async getUser() {
    const { id } = this.props;
    const user = await getUsers(id);

    if (!user) {
      this.setState({ user: null });
    }

    this.setState({ user });
  }

  render() {
    const { clear } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user?.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
        <button
          type="button"
          onClick={clear}
        >
          Clear user
        </button>
      </div>
    );
  }
}

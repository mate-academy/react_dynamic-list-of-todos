import React from 'react';
import { getUserById } from '../../api';
import './CurrentUser.scss';

interface State {
  user: User | null,
}

interface Props {
  selectedUserId: number,
  callback: (id: number) => void,
}

export class CurrentUser extends React.PureComponent<Props, State> {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.setUser();
    }
  }

  async setUser() {
    const { selectedUserId } = this.props;
    const user = await getUserById(selectedUserId)
      .catch(() => this.setState({ user: null }));

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { callback } = this.props;

    if (!user) {
      return (
        <div className="CurrentUser">
          <h3 className="CurrentUser__name">User not found</h3>
          <button
            className="CurrentUser__button"
            type="button"
            onClick={() => callback(0)}
          >
            Remove a choice
          </button>
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">{`Selected user: ${(user as User).id}`}</h2>

        <h3 className="CurrentUser__name">{(user as User).name}</h3>
        <p className="CurrentUser__email">{(user as User).email}</p>
        <p className="CurrentUser__phone">{(user as User).phone}</p>
        <button
          className="CurrentUser__button"
          type="button"
          onClick={() => callback(0)}
        >
          Remove a choice
        </button>
      </div>
    );
  }
}

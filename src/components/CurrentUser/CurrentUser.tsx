import React from 'react';
import './CurrentUser.scss';
import { getUsersById } from '../../api';
import { User } from '../../react-app-env';

type Props = {
  userId: number;
  onClearUserInfo: () => void;
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
    const user = await getUsersById(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { onClearUserInfo } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user?.id}`}</span>
        </h2>
        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear button"
          onClick={onClearUserInfo}
        >
          Clear User Info
        </button>
      </div>
    );
  }
}

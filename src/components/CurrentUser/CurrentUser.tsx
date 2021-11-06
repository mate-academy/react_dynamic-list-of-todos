import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number;
  clearSelectedUser: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    getUser(this.props.selectedUserId)
      .then(user => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps: Props) {
    const { selectedUserId } = this.props;

    if (prevProps.selectedUserId !== selectedUserId) {
      getUser(selectedUserId)
        .then(user => {
          this.setState({ user });
        });
    }
  }

  render() {
    const { user } = this.state;
    const { clearSelectedUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {` ${user?.id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {user?.name}
        </h3>
        <p className="CurrentUser__email">
          {user?.email}
        </p>
        <p className="CurrentUser__phone">
          {user?.phone}
        </p>
        <button
          type="button"
          className="button"
          onClick={clearSelectedUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

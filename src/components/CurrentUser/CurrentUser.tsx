import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api/api';

type State = {
  user: User | null,
};

type Props = {
  selectedUserId: number,
  onCleared: (id: number) => void,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getSelectedUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.getSelectedUser();
    }
  }

  getSelectedUser = () => {
    const { selectedUserId } = this.props;

    getUserById(selectedUserId)
      .then(user => {
        this.setState({ user });
      });
  };

  render() {
    const { user } = this.state;
    const { onCleared } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user?.id}
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
          className="CurrentUser__button button"
          onClick={() => onCleared(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}

import React from 'react';
import './CurrentUser.scss';

import { getResponse } from '../../api';

type Props = {
  selectedUserId: number,
  clearUser: () => void;
};

type State = {
  selectedUser: User | null,
  isLoading: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    selectedUser: null,
    isLoading: true,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(props: Props) {
    if (props.selectedUserId !== this.props.selectedUserId) {
      this.setIsLoading();
      this.loadData();
    }
  }

  setIsLoading = () => {
    this.setState({ isLoading: true });
  };

  loadData = async () => {
    const newSelectedUser = await getResponse(`users/${this.props.selectedUserId}`);

    this.setState({ selectedUser: newSelectedUser, isLoading: false });
  };

  clearCurrentUser = () => {
    this.props.clearUser();
    this.setState({ selectedUser: null });
  };

  render() {
    const { selectedUser, isLoading } = this.state;
    const { clearCurrentUser } = this;

    return (
      <div className="CurrentUser">
        {isLoading ? (
          <div className="loader" />
        ) : (
          selectedUser && (
            <>
              <h2 className="CurrentUser__title">
                {'Selected user: '}
                {selectedUser.id}
              </h2>
              <h3 className="CurrentUser__name">
                {selectedUser.name}
              </h3>
              <p className="CurrentUser__email">
                {selectedUser.email}
              </p>
              <p className="CurrentUser__phone">
                {selectedUser.phone}
              </p>
              <button
                type="button"
                className="button"
                onClick={clearCurrentUser}
              >
                Clear
              </button>
            </>
          )
        )}
      </div>
    );
  }
}

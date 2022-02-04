import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number;
  selectUser: (selectedUserId: number) => void;
  changeLoadingStatus: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedUserId !== prevProps.selectedUserId) {
      this.clearUser();
      this.loadUser();
    }
  }

  clearUser = () => {
    this.setState({ user: null });
  };

  async loadUser() {
    const user = await getUser(this.props.selectedUserId);

    this.setState({ user });
    this.props.changeLoadingStatus();
  }

  render() {
    const { user } = this.state;
    const { selectedUserId, selectUser } = this.props;

    return (
      <>
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${selectedUserId}`}</span>
        </h2>
        {user && (
          <div className="CurrentUser">
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="button CurrentUser__clear"
              onClick={() => selectUser(0)}
            >
              Clear
            </button>
          </div>
        )}
      </>
    );
  }
}

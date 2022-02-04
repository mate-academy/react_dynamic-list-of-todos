import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  onUserSelect: (newUserId: number) => void
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.loadUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUser();
    }
  }

  clearUser = () => {
    this.props.onUserSelect(0);
  };

  async loadUser() {
    const user = await getUser(this.props.selectedUserId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            className="button button--centered"
            type="button"
            onClick={this.clearUser}
          >
            Clear
          </button>
        </div>
      )
    );
  }
}

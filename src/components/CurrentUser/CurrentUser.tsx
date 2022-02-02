import React from 'react';
import { getUserById } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  clearUser: () => void,
};

type State = {
  user: User | null
};

export class CurrentUser extends React.PureComponent<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount = () => {
    this.loadData();
  };

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadData();
    }
  };

  async loadData() {
    const user = await getUserById(this.props.selectedUserId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { selectedUserId, clearUser } = this.props;

    return (
      !user
        ? 'User not founded'
        : (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUserId}`}</span></h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              className="button TodoList__user-button--selected"
              onClick={clearUser}
            >
              remove
            </button>
          </div>
        )
    );
  }
}

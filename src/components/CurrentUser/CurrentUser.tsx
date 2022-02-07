import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number,
  setUserId: (userId: number) => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.updateUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedUserId === prevProps.selectedUserId) {
      return;
    }

    this.updateUser();
  }

  updateUser = async () => {
    try {
      const user: User = await getUser(this.props.selectedUserId);

      this.setState({
        user,
      });
    } catch (e) {
      this.setState({
        user: null,
      });
    }
  };

  clear = () => {
    this.props.setUserId(0);
  };

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <p>No user was founded</p>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>
        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear button"
          onClick={this.clear}
        >
          Clear
        </button>
      </div>
    );
  }
}

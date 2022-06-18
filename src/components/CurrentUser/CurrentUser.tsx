import React from 'react';
import './CurrentUser.scss';
// import { render } from 'react-dom';
import { getUserInfo } from '../../Api/api';
import { User } from '../../types/User';

type Props = {
  selectedUserId: number,
  selectUser: (num: number) => void
};

type State = {
  user: User
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: {},
  };

  componentDidMount() {
    getUserInfo(this.props.selectedUserId)
      .then(res => this.setState({ user: res }));
  }

  componentDidUpdate(prev: Props) {
    if (this.props.selectedUserId !== prev.selectedUserId) {
      getUserInfo(this.props.selectedUserId)
        .then(res => this.setState({ user: res }));
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={() => this.props.selectUser(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}

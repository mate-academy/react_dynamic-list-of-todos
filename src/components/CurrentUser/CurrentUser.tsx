import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number;
  setSelectedUserId:(id:number)=>void;
};

type State = {
  currentUser: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    currentUser: null,
  };

  async componentDidMount() {
    this.reloadUser();
  }

  async componentDidUpdate() {
    if (this.props.selectedUserId !== this.state.currentUser?.id) {
      this.reloadUser();
    }
  }

  resetUserId = () => {
    this.props.setSelectedUserId(0);
  };

  async reloadUser() {
    const user = await getUser(this.props.selectedUserId);

    this.setState({ currentUser: user });
  }

  render() {
    const { currentUser } = this.state;

    if (!currentUser) {
      return <div>User not found</div>;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {this.props.selectedUserId}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{currentUser.email}</p>
        <p className="CurrentUser__phone">213</p>
        <button
          className="ResetList"
          type="button"
          onClick={() => this.resetUserId()}
        >
          Clear
        </button>
      </div>
    );
  }
}

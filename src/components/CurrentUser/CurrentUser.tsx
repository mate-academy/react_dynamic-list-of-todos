import React from 'react';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  getUser: (userId: number) => Promise<User>;
  clearUser: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.props.getUser(this.props.selectedUserId)
      .then(user => {
        this.setState({
          user,
        });
      });
  }

  componentDidUpdate() {
    this.props.getUser(this.props.selectedUserId)
      .then(user => {
        if (this.state.user && this.props.selectedUserId !== this.state.user.id) {
          this.setState({
            user,
          });
        }
      });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user && user.id}`}</span></h2>

        <h3 className="CurrentUser__name">{user && user.name}</h3>
        <p className="CurrentUser__email">{user && user.email}</p>
        <p className="CurrentUser__phone">{user && user.phone}</p>
        <button
          type="button"
          className="btn btn-primary w-50 mt-4"
          onClick={() => this.props.clearUser()}
        >
          Clear
        </button>
      </div>
    );
  }
}

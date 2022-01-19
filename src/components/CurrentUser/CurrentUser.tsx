import React from 'react';
import './CurrentUser.scss';
import { getData } from '../../api/api';

type Props = {
  userId: number,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.PureComponent<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.getUsers();
    }
  }

  clearSelectedUser = () => {
    this.setState({ user: null });
  };

  getUsers = () => {
    getData(`/users/${this.props.userId}`)
      .then(user => {
        this.setState({ user });
      });
  };

  render() {
    const { user } = this.state;
    const { userId } = this.props;

    return (
      user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${userId}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {user.name}
          </h3>
          <p className="CurrentUser__email">
            {user.email}
          </p>
          <p className="CurrentUser__phone">
            {user.phone}
          </p>
          <button
            type="button"
            className="CurrentUser__clear"
            onClick={this.clearSelectedUser}
          >
            Clear
          </button>
        </div>
      ));
  }
}

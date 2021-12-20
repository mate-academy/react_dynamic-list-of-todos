import React from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api';
import { User } from '../types/User';

type Props = {
  userId: number,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state:State = {
    user: null,
  };

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  getUser = () => {
    getUsers()
      .then(users => {
        this.setState({
          user: users.find((user:User) => user.id === this.props.userId),
        });
      });
  };

  render() {
    return (
      this.state.user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {this.props.userId}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{this.state.user.name}</h3>
          <p className="CurrentUser__email">{this.state.user.email}</p>
          <p className="CurrentUser__phone">{this.state.user.phone}</p>

          <button
            type="button"
            onClick={() => this.setState({ user: null })}
          >
            Clear
          </button>
        </div>
      )
    );
  }
}

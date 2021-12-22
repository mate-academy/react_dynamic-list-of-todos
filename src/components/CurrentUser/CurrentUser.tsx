/* eslint-disable no-console */
import React from 'react';
import './CurrentUser.scss';

type User = {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
};

interface Props {
  userId: number;
}

interface State {
  user: User | null;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    fetch(`https://mate.academy/students-api/users/${this.props.userId}`)
      .then(response => response.json())
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prewProps: Props) {
    if (prewProps !== this.props) {
      fetch(`https://mate.academy/students-api/users/${this.props.userId}`)
        .then(response => response.json())
        .then(user => this.setState({ user }));
    }
  }

  render() {
    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {this.state.user?.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {this.state.user?.name}
        </h3>
        <p className="CurrentUser__email">{this.state.user?.email}</p>
        <p className="CurrentUser__phone">{this.state.user?.phone}</p>
      </div>
    );
  }
}

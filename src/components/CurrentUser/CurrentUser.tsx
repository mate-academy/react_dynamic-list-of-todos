import React from 'react';
import './CurrentUser.scss';
import { User } from '../../types';

interface Props {
  userId: number;
  onClearUser: () => void;
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

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      fetch(`https://mate.academy/students-api/users/${this.props.userId}`)
        .then(response => response.json())
        .then(user => this.setState({ user }));
    }
  }

  render() {
    const { user } = this.state;

    return (
      user && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user.id}`}</span>
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
            className="CurrentUser__button button"
            type="button"
            onClick={this.props.onClearUser}
          >
            Clear
          </button>
        </div>
      )
    );
  }
}

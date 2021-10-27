import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api/todos';

type Props = {
  userId: number;
};

type State = {
  user: User;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: {
      id: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    },
  };

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(user => this.setState({ user }));
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        {user.id !== 0
        && (
          <button
            type="button"
            className="TodoList__user-button button CurrentUser__clear"
            onClick={() => this.setState({
              user: {
                id: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                name: '',
                username: '',
                email: '',
                phone: '',
                website: '',
              },
            })}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

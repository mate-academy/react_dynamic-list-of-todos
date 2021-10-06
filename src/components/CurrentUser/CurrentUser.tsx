import React from 'react';
import { getUser } from '../../API/api';
import './CurrentUser.scss';

type Props = {
  userId: number;
  onUserChange: (selectedUserId: number) => void;
};

type State = {
  user: User;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: {
      id: 0,
      createdAt: '',
      updatedAt: '',
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    },
  };

  componentDidMount() {
    const { userId } = this.props;

    getUser(userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      getUser(this.props.userId)
        .then(user => this.setState({ user }));
    }
  }

  render() {
    const {
      id, name, email, phone,
    } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          onClick={() => this.props.onUserChange(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}

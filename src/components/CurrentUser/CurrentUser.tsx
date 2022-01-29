// import { userInfo } from 'os';
import React from 'react';
// import { render } from 'react-dom';
// import { render } from 'react-dom';
import { getUser } from '../API/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  resetUser: () => void,
};

interface User {
  email: string,
  id: number,
  name: string
  phone: string
  username: string
}

type State = {
  user: User,
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {
      email: '',
      id: 0,
      name: '',
      phone: '',
      username: '',
    },
  };

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  loadData() {
    getUser(this.props.userId).then(user => {
      this.setState({ user });
    });

    return (
      <p>
        No user selected
      </p>
    );
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2
          className="CurrentUser__title"
        >
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          onClick={this.props.resetUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

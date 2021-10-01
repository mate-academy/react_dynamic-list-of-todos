import React from 'react';
import './CurrentUser.scss';
import { User } from './UserType';

interface Props {
  userID: number;
}

interface State {
  activeUser: User;
}

export class CurrentUser extends React.Component<Props> {
  state: State = {
    activeUser: {
      id: 0,
      name: 'no user selected',
      email: '',
      phone: '',
    },
  };

  componentDidMount() {
    this.request(this.props.userID);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userID !== prevProps.userID) {
      this.request(this.props.userID);
    }
  }

  clear = () => {
    this.setState({
      activeUser: {
        id: 0,
        name: 'no user selected',
        email: '',
        phone: '',
      },
    });
  };

  request = async (id: number) => {
    const todosResponse = await fetch(`https://mate.academy/students-api/users/${id}`);

    const user: User = await todosResponse.json();

    this.setState({ activeUser: user });
  };

  render() {
    const { activeUser: user } = this.state;

    return (
      <>
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
        </div>
        <button
          type="button"
          onClick={() => this.clear()}
        >
          Clear
        </button>
      </>
    );
  }
}

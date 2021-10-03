import React from 'react';
import './CurrentUser.scss';

type Props = {
  userId: number;
  clearSelectedUserId: () => void;
};

interface User {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}

type State = {
  currentUser: User;
  showUser: boolean;
  showError: boolean,
};

export class CurrentUser extends React.PureComponent<Props, State> {
  state: State = {
    currentUser: {
      id: NaN,
      createdAt: '',
      updatedAt: '',
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    },
    showUser: false,
    showError: false,
  };

  componentDidMount() {
    this.currentUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.currentUser();
    }
  }

  currentUser = async () => {
    const response = await fetch(`https://mate.academy/students-api/users/${this.props.userId}`);

    if (!response.ok) {
      throw new Error('Error: invalid reference');
    }

    try {
      const userUpdate = await response.json();

      this.setState({
        currentUser: userUpdate,
        showUser: true,
        showError: false,
      });
    } catch (error) {
      this.setState({
        showUser: false,
        showError: true,
      });
    }
  };

  render() {
    const {
      id, name, email, phone,
    } = this.state.currentUser;

    return (
      <>
        {this.state.showUser && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{`Selected user: ${id}`}</span></h2>

            <h3 className="CurrentUser__name">{name}</h3>
            <p className="CurrentUser__email">{email}</p>
            <p className="CurrentUser__phone">{phone}</p>
          </div>
        )}
        {this.state.showError && (
          <span style={{ color: 'red', fontSize: '20px' }}>
            Something went wrong
          </span>
        )}
        {this.state.showUser && (
          <button
            type="button"
            className="TodoList__user-button button"
            onClick={this.props.clearSelectedUserId}
          >
            Clear
          </button>
        )}
      </>
    );
  }
}

import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../Api/Api';

type ClearUser = () => void;
type HandleUserError = (error: string) => void;

type Props = {
  selectedUserId: number;
  clearUser: ClearUser;
  handleUserError: HandleUserError;
};

type State = {
  user: User;
};

class CurrentUser extends React.Component<Props, State> {
  state = {
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
    this.getUserFromServer();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedUserId !== prevProps.selectedUserId) {
      this.loadUsers();
    }
  }

  clearHandler = () => {
    this.props.clearUser();
  };

  loadUsers = () => {
    this.setState({
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
    });
    this.getUserFromServer();
  };

  getUserFromServer = async () => {
    let user: User;
    let serverError = false;

    try {
      user = await getUser(this.props.selectedUserId);
    } catch (error) {
      serverError = true;

      const str = `An error has ocurred while getting data from server: ${String(error)}`;

      this.props.handleUserError(str);
    }

    if (!serverError) {
      this.setState((state) => ({
        ...state,
        user,
      }));
    }
  };

  userLoader = () => {
    const {
      id, name, email, phone,
    } = this.state.user;

    if (this.state.user.id === 0) {
      return (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              The data is loading
            </span>
          </h2>
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          className="CurrentUser__clear"
          type="button"
          onClick={this.clearHandler}
        >
          Clear
        </button>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.userLoader()}
      </>
    );
  }
}

export default CurrentUser;

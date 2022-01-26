import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../Api/Api';

type ClearUser = () => void;

type Props = {
  selectedUserId: number;
  clearUser: ClearUser;
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
      this.getUserFromServer();
    }
  }

  clearHandler = () => {
    this.props.clearUser();
  };

  getUserFromServer = async () => {
    const user = await getUser(this.props.selectedUserId);

    this.setState((state) => ({
      ...state,
      user,
    }));
  };

  render() {
    const {
      id, name, email, phone,
    } = this.state.user;

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
  }
}

export default CurrentUser;

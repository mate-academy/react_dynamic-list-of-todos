import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api/index';

type Props = {
  selectedUser: number;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUser !== this.props.selectedUser) {
      this.getUser();
    }
  }

  getUser = async () => {
    const user = await getUserById(this.props.selectedUser);

    this.setState({
      user,
    });
  };

  render() {
    const { user } = this.state;

    return user ? (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user ${user.id}`}
          </span>
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
      </div>
    ) : (
      <p>No users with this ID or you are offline</p>
    );
  }
}

import React from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api';

type Props = {
  userId: number,
  removeUser: () => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component <Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate(props: Props) {
    if (props.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUsers(this.props.userId);

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    const { removeUser } = this.props;

    return (
      <div>
        {user && (
          <div className="CurrentUser">
            <button
              type="button"
              onClick={removeUser}
            >
              Remove
            </button>

            <h2 className="CurrentUser__title"><span>Selected user: 2</span></h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>
        )}
      </div>
    );
  }
}

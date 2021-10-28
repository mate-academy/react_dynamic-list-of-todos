import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  userId: number,
  deleteUser: () => void,
};

type State = {
  user: null | User;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUser(this.props.userId);

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    const { deleteUser } = this.props;

    if (!user) {
      return 'No user selected';
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user
            {' '}
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {user.name}
        </h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          onClick={() => (
            deleteUser()
          )}
        >
          Clear
        </button>
      </div>
    );
  }
}

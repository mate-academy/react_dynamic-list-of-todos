import React from 'react';
import { getUsers } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  clearState: () => void,
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
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

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { clearState } = this.props;

    if (!user) {
      return 'User is not chosen';
    }

    return (
      <div className="CurrentUser">
        <button
          type="button"
          className="button"
          onClick={clearState}
        >
          Clear
        </button>
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${user.id}`}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}

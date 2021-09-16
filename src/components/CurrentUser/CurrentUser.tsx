import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  selectedUserId: number,
  resetUserId: () => void;
}

interface State {
  user: User | null;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.updateUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.updateUser();
    }
  }

  updateUser = async () => {
    const user = await getUser(this.props.selectedUserId);

    this.setState({ user });
  };

  render() {
    const { selectedUserId } = this.props;
    const { user } = this.state;

    if (!user) {
      return (
        <div>
          No user found
        </div>
      );
    }

    return (
      <div className="CurrentUser d-flex flex-column">
        <h2 className="CurrentUser__title">
          <span>
            {'Selected user: '}
            {selectedUserId}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="submit"
          className="border rounded bg-primary mx-auto py-2 text-light w-50"
          onClick={this.props.resetUserId}
        >
          Clear
        </button>
      </div>
    );
  }
}

import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

interface State {
  user: User | null,
}

interface Props {
  selectedUserId: number,
  clear: () => void,
}
export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser(this.props.selectedUserId);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUser(this.props.selectedUserId);
    }
  }

  async loadUser(userId: number) {
    const user = await getUser(userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      user && (
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
            className="CurrentUser__clear-btn"
            type="button"
            onClick={this.props.clear}
          >
            Clear
          </button>
        </>
      )
    );
  }
}

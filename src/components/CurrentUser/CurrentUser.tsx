import React from 'react';
import { getUserByID } from '../../api';
import './CurrentUser.scss';

interface Props {
  userId: number,
  clearSelection: () => void,
}

interface State {
  user: User,
}

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {} as User,
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  componentDidUpdate() {
    if (this.state.user.id !== this.props.userId) {
      this.loadUserInfo();
    }
  }

  async loadUserInfo() {
    const user: User = await getUserByID(this.props.userId);

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span className="CurrentUser__title--span">
            {`Selected user: ${user.id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{`${user.name} ${user.username}`}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          className="button"
          onClick={this.props.clearSelection}
        >
          Clear user
        </button>
      </div>
    );
  }
}

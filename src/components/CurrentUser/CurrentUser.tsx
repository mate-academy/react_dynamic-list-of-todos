import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api/api';

interface Props {
  userId: number,
  onClear: () => void,
}

interface State {
  user: User | null,
  userLoadError: boolean,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    userLoadError: false,
  };

  async componentDidMount() {
    await this.getCurrentUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      await this.getCurrentUser();
    }
  }

  getCurrentUser = async () => {
    try {
      const currentUser = await getUserById(this.props.userId);

      this.setState({
        user: currentUser,
        userLoadError: false,
      });
    } catch {
      this.setState({
        user: null,
        userLoadError: true,
      });
    }
  };

  render() {
    const { user, userLoadError } = this.state;

    return (
      (user && !userLoadError) ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            className="button"
            type="button"
            onClick={this.props.onClear}
          >
            Clear user
          </button>
        </div>
      ) : (
        `Couldn't load info about user #${this.props.userId}`
      )
    );
  }
}

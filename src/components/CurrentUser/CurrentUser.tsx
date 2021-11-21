import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

interface Props {
  userId: number,
  onClear: () => void,
}

interface State {
  user: User,
  userLoadError: boolean,
}

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {} as User,
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
      const currentUser = await getUser(this.props.userId);

      this.setState({
        user: currentUser,
        userLoadError: false,
      });
    } catch {
      this.setState({
        userLoadError: true,
      });
    }
  };

  render() {
    const {
      id,
      name,
      email,
      phone,
    } = this.state.user;

    return (
      !this.state.userLoadError ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`Selected user: ${id}`}</span></h2>
          <h3 className="CurrentUser__name">{name}</h3>
          <p className="CurrentUser__email">{email}</p>
          <p className="CurrentUser__phone">{phone}</p>
          <button
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

import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api/api';

interface Props {
  userId: number,
  clearUser: () => void,
}

interface State {
  user: User | null,
  showErrorMessage: boolean,
}
export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {} as User,
    showErrorMessage: false,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: { userId: number; }) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  handleClearButton = () => {
    this.setState({ user: null });
    const clear = this.props.clearUser;

    clear();
  };

  async loadData() {
    try {
      const user = await getUserById(this.props.userId);

      this.setState({
        user,
        showErrorMessage: false,
      });
    } catch (error) {
      this.handleClearButton();
      this.setState({ showErrorMessage: true });
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        {
          user && (
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
              <button
                type="button"
                onClick={this.handleClearButton}
              >
                Clear
              </button>
            </div>
          )
        }

        {
          this.state.showErrorMessage
            ? (<h1>Error ocured while loading user&apos; info</h1>)
            : null
        }
      </div>
    );
  }
}

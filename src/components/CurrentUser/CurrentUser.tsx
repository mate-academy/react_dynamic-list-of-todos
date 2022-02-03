import React from 'react';
import { getUsers } from '../../api/api';
import './CurrentUser.scss';

interface Props {
  userId: number;
  resetUserSelection: () => void;
}

interface State {
  user: null | User;
  isUserError: boolean;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    isUserError: false,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      this.loadData();
    }
  }

  async loadData() {
    try {
      const userFromServer = await getUsers(this.props.userId);

      this.setState({ user: userFromServer, isUserError: false });
    } catch (error) {
      this.setState({ isUserError: true });
    }
  }

  render() {
    const { user, isUserError } = this.state;
    const { resetUserSelection } = this.props;

    return (
      <div className="CurrentUser">
        <button
          className="List__user-button button"
          type="submit"
          onClick={resetUserSelection}
        >
          Clear
        </button>
        <h2 className="CurrentUser__title">
          <span>
            {(isUserError && 'OOPS..something went wrong...🙁') || ((user && user.id != null) && `Selected user: ${user.id}`)}
          </span>
        </h2>
        {!isUserError && (
          <>
            <h3 className="CurrentUser__name">{user && user.name}</h3>
            <p className="CurrentUser__email">{user && user.email}</p>
            <p className="CurrentUser__phone">{user && user.phone}</p>
          </>
        )}
      </div>
    );
  }
}

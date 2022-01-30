import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number;
  removeUser: (userId: number) => void;
};

type State = {
  user: User | null;
  hasLoadError: boolean;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    hasLoadError: false,
  };

  async componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    try {
      const user = await getUser(this.props.userId);

      this.setState({
        user,
        hasLoadError: false,
      });
    } catch (e) {
      this.setState({ hasLoadError: true });
    }
  }

  render() {
    const { user, hasLoadError } = this.state;
    const { removeUser } = this.props;

    return (
      <div className="CurrentUser">
        {hasLoadError ? <div>User not found :(</div> : (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>
            <h3 className="CurrentUser__name">{user?.name}</h3>
            <p className="CurrentUser__email">{user?.email}</p>
            <p className="CurrentUser__phone">{user?.phone}</p>
            <button
              type="button"
              onClick={() => removeUser(0)}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}

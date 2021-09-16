import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number;
  onReset: () => void;
}

interface State {
  currentUser: null | User;
  hasLoadingError: boolean;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    currentUser: null,
    hasLoadingError: false,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      this.loadUser();
    }
  }

  loadUser = async () => {
    try {
      const { selectedUserId } = this.props;

      const user = await getUser(selectedUserId);

      this.setState({
        currentUser: user,
        hasLoadingError: false,
      });
    } catch {
      this.setState({ hasLoadingError: true });
    }
  };

  render() {
    const { currentUser, hasLoadingError } = this.state;
    const { onReset } = this.props;

    return (
      currentUser && (
        <div className="CurrentUser">
          {hasLoadingError
            ? <h2>Cannot load user</h2>
            : (
              <>
                <h2 className="CurrentUser__title">
                  <span>{`Selected user: ${currentUser?.id}`}</span>
                </h2>
                <h3 className="CurrentUser__name">
                  {currentUser?.name}
                </h3>
                <p className="CurrentUser__email">
                  {currentUser?.email}
                </p>
                <p className="CurrentUser__phone">
                  {currentUser?.phone}
                </p>

                <button
                  type="button"
                  className="button CurrentUser__clear"
                  onClick={onReset}
                >
                  Clear
                </button>
              </>
            )}
        </div>
      )
    );
  }
}

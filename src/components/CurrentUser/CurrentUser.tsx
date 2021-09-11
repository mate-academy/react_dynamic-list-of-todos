import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  selectedUser: number;
  clear: () => void;
}

interface State {
  user: null | User;
  hasRequestError: boolean;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    hasRequestError: false,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps !== this.props) {
      this.loadData();
    }
  }

  loadData = async () => {
    try {
      const user = await getUser(this.props.selectedUser);

      this.setState({
        user,
        hasRequestError: false,
      });
    } catch (error) {
      this.setState({
        hasRequestError: true,
      });
    }
  };

  render() {
    const { user, hasRequestError } = this.state;
    const { clear } = this.props;

    return (
      user && (
        <div className="CurrentUser">
          {hasRequestError ? (
            <p className="App__content--error">
              Houston, we have a problem
            </p>
          ) : (
            <>
              <h2 className="CurrentUser__title">
                <span>{`Selected user: ${user.id}`}</span>
              </h2>

              <h3 className="CurrentUser__name">
                {user.name}
              </h3>
              <p className="CurrentUser__email">
                {user.email}
              </p>
              <p className="CurrentUser__phone">
                {user.phone}
              </p>

              <button
                className="CurrentUser__clear button"
                type="button"
                onClick={clear}
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

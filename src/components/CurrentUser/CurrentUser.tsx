import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number;
  selectUser: (id: number) => void;
};

type State = {
  user: User | null;
  loadingError: boolean;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    loadingError: false,
  };

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  getUser = () => {
    getUser(this.props.userId)
      .then(user => {
        this.setState({ user, loadingError: false });
      })
      .catch(() => {
        this.setState({ loadingError: true });
        // throw new Error(`Fetching user: ${error}`);
      });
  };

  render() {
    const { user, loadingError } = this.state;
    const { selectUser } = this.props;

    return (
      <div className="CurrentUser">
        {loadingError && (<p> No such a user in the database </p>)}
        { user && !loadingError && (
          <>
            <h2 className="CurrentUser__title">
              {'Selected user: '}
              {user.id}
            </h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              className="TodoList__user-button TodoList__user-button--selected button"
              type="button"
              onClick={() => selectUser(0)}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}

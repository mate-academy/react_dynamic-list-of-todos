import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number;
  selectUser: (id: number) => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
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
        this.setState({ user });
      });
  };

  render() {
    const { user } = this.state;
    const { selectUser } = this.props;

    return (
      <div className="CurrentUser">
        { (user) && (
          <>
            <h2 className="CurrentUser__title">
              {'Selected user: '}
              {user.id}
            </h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              className="TodoList__user-button TodoList__user-button button"
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

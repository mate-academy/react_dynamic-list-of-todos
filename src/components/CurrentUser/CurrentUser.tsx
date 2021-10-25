import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  unselectedUser:() => void;
  userId: number;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(user => {
          this.setState({ user });
        });
    }
  }

  render() {
    const { user } = this.state;

    return (
      user && (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              className="CurrentUser__button"
              type="button"
              onClick={this.props.unselectedUser}
            >
              Clear
            </button>
          </div>
        </>
      )
    );
  }
}

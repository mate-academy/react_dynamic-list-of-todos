import React from 'react';
import { getUser } from '../../api/api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

type Props = {
  userId: number;
  clear(): void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        {
          user && (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id || user}`}</span></h2>

              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>

              <button
                className="CurrentUser__button-clear"
                type="button"
                onClick={() => this.props.clear()}
              >
                Clear
              </button>
            </div>
          )
        }
      </>
    );
  }
}

import React from 'react';
import { getUserById } from '../../api/api';
import { User } from '../../types/type';
import './CurrentUser.scss';

interface Props {
  id: number;
  clear: (id: number) => void;
}

interface State {
  user: User;
  isUserLoaded: boolean,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    isUserLoaded: true,
    user: {
      id: 0,
      name: '',
      email: null,
      phone: null,
    },
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.id !== this.props.id) {
      this.loadUser();
    }
  }

  async loadUser() {
    try {
      const user = await getUserById(this.props.id);

      this.setState({ user, isUserLoaded: true });
    } catch (error) {
      this.setState({ isUserLoaded: false });
    }
  }

  render() {
    return (
      <>
        {this.state.isUserLoaded
          ? (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title"><span>{`Selected user: ${this.state.user.id}`}</span></h2>

              <h3 className="CurrentUser__name">{this.state.user.name}</h3>
              <p className="CurrentUser__email">{this.state.user.email}</p>
              <p className="CurrentUser__phone">{this.state.user.phone}</p>
              <button
                type="button"
                className="button CurrentUser__button"
                onClick={() => this.props.clear(0)}
              >
                Clear
              </button>
            </div>
          )
          : <h2>There is no such user :(</h2>}
      </>
    );
  }
}

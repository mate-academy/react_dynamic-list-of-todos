import React from 'react';
import { getUser } from '../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  onClear: () => void,
};

type State = {
  user: User,
  isCleared: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: {
      id: 0,
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    },
    isCleared: false,
  };

  async componentDidMount() {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  componentDidUpdate = async (prevProps: Props) => {
    if (this.props.userId !== prevProps.userId) {
      const user = await getUser(this.props.userId);

      /* eslint-disable-next-line */
      this.setState({ user, isCleared: false });
    }
  };

  clear = () => {
    this.setState({ isCleared: true });
  };

  render() {
    return (
      !this.state.isCleared ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {this.state.user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{this.state.user.name}</h3>
          <p className="CurrentUser__email">{this.state.user.email}</p>
          <p className="CurrentUser__phone">{this.state.user.phone}</p>
          <button
            type="button"
            className="button"
            onClick={() => {
              this.clear();
              this.props.onClear();
            }}
          >
            clear
          </button>
        </div>
      ) : (
        'No user selected'
      )
    );
  }
}

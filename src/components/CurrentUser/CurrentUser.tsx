import React from 'react';
import './CurrentUser.scss';
import { getData } from '../../api/api';

type Props = {
  userId: number;
  clearUser: () => void;
};

type State = {
  user: User | null;
  errorMessage: string;
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {
      id: 0,
      createdAt: '',
      updatedAt: '',
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    },
    errorMessage: '',
  };

  componentDidMount() {
    if (this.props.userId !== 0) {
      this.getUser();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  getUser = async () => {
    try {
      const user = await getData(`users/${this.props.userId}`);

      this.setState({ user, errorMessage: '' });
    } catch (e) {
      this.setState({ user: null, errorMessage: 'I don\'t know where this user is)0' });
    }
  };

  render() {
    const { user, errorMessage } = this.state;
    const { userId, clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${userId}`}
          </span>
        </h2>

        {user ? (
          <div className="CurrentUser__info">
            <h3 className="CurrentUser__name">
              {user.name}
            </h3>

            <p className="CurrentUser__email">
              {user.email}
            </p>

            <p
              className="CurrentUser__phone"
            >
              {user.phone}
            </p>

            <button
              className="CurrentUser__button button"
              type="button"
              onClick={clearUser}
            >
              Clear
            </button>
          </div>
        ) : (
          <p className="CurrentUser__error">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
}

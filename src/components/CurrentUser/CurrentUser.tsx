import React from 'react';
import { getData } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  handleClear: () => void,
};

type State = {
  user: User | null,
  errorMessage: string,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    errorMessage: '',
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  loadUser = async () => {
    try {
      const user = await getData(`users/${this.props.userId}`);

      this.setState({ user, errorMessage: '' });
    } catch (error) {
      this.setState({ user: null, errorMessage: 'User wasn\'t found' });
    }
  };

  render() {
    const { user, errorMessage } = this.state;
    const { userId, handleClear } = this.props;

    return (
      <div className="CurrentUser">

        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {userId}
          </span>
        </h2>
        {user ? (
          <>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              className="CurrentUser__button button"
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
          </>
        ) : (
          <p>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
}

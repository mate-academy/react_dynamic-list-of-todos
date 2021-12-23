import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number;
  clearUser(): void;
};

type State = {
  id: number;
  name: string;
  email: string;
  phone: string;
  isLoading: boolean;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    isLoading: false,
  };

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps:Props) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }

  fetchUser = () => {
    this.setState({ isLoading: true });
    getUser(this.props.userId)
      .then(({
        id, name, email, phone,
      }) => this.setState({
        id, name, email, phone,
      }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render(): React.ReactNode {
    const {
      id, name, email, phone, isLoading,
    } = this.state;

    return (
      <div className="CurrentUser">
        {isLoading
          ? 'Loading user data... Please, wait'
          : (
            <>
              <h2 className="CurrentUser__title">
                <span>{`Selected user: ${id}`}</span>
              </h2>
              <h3 className="CurrentUser__name">{name}</h3>
              <p className="CurrentUser__email">{email}</p>
              <p className="CurrentUser__phone">{phone}</p>
              <button
                className="button CurrentUser__clear"
                type="button"
                onClick={this.props.clearUser}
              >
                Clear
              </button>
            </>
          )}
      </div>
    );
  }
}

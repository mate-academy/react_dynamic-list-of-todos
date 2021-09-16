import React from 'react';
import './CurrentUser.scss';
import { loadUserData } from '../../api';

interface Props {
  userId: number;
  clearSelectedUser: () => void;
}

type State = User & {
  error: boolean;
  loading: boolean;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    error: false,
    loading: false,
  };

  componentDidMount() {
    this.loadUserData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserData();
    }
  }

  loadUserData = async () => {
    try {
      this.setState({
        loading: true,
      });
      const userData = await loadUserData(this.props.userId);

      this.setState({
        ...userData,
        loading: false,
        error: false,
      });
    } catch {
      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  render() {
    const {
      id,
      name,
      email,
      phone,
      error,
      loading,
    } = this.state;

    return (
      <>
        {
          loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {error && (
                <h2>Ups... Something went wrong</h2>
              )}
              {!error && (
                <div className="CurrentUser">
                  <h2 className="CurrentUser__title">
                    <span>{`Selected user: ${id}`}</span>
                  </h2>

                  <h3 className="CurrentUser__name">{name}</h3>
                  <p className="CurrentUser__email">{email}</p>
                  <p className="CurrentUser__phone">{phone}</p>
                  <button
                    className="button"
                    type="button"
                    onClick={this.props.clearSelectedUser}
                  >
                    Clear
                  </button>
                </div>
              )}
            </>
          )
        }
      </>
    );
  }
}

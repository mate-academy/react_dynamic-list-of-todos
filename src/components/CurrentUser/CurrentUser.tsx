import React from 'react';
import Loader from 'react-loader-spinner';
import './CurrentUser.scss';
import { getUser } from '../../api/api';
import { LoadingError } from '../LoadingError';

type Props = {
  userId: number;
  clearUser: () => void;
};

interface State {
  user: User | null;
  isLoading: boolean;
}

export class CurrentUser extends React.PureComponent<Props, State> {
  state = {
    user: null,
    isLoading: false,
  };

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate(prevProps: Props) {
    if ((prevProps.userId !== this.props.userId) && this.props.userId !== 0) {
      this.loadData();
    }
  }

  async loadData() {
    try {
      this.setState({ isLoading: true });

      const user = await getUser(this.props.userId);

      this.setState({
        isLoading: false,
        user,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        user: null,
      });
    }
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return (
        <Loader
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
        />
      );
    }

    if (!user) {
      return (
        <LoadingError
          errorMessage="An error occured when loading user!"
        />
      );
    }

    const {
      id,
      name,
      email,
      phone,
    } = user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          type="button"
          className="button"
          onClick={this.props.clearUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

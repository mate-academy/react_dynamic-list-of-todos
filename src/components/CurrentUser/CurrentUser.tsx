/* eslint-disable react/no-unused-state */
import React from 'react';

import { getUser } from '../../api/api';

import './CurrentUser.scss';

type Props = {
  userId: number;
  onClear: () => void;
};

type State = {
  user: User | null;
  error: string | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    error: null,
  };

  async componentDidMount() {
    await this.setUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      await this.setUser();
    }
  }

  async setUser() {
    try {
      const user = await getUser(this.props.userId);

      this.setState({
        user,
        error: null,
      });
    } catch (e) {
      this.setState({ error: `Failed to load user ${this.props.userId}` });
    }
  }

  render() {
    const { user, error } = this.state;
    const { onClear, userId } = this.props;

    if (error) {
      return (
        <h2 className="CurrentUser__error">
          {error}
        </h2>
      );
    }

    return user && (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          className="CurrentUser__clear button"
          onClick={() => onClear()}
          type="button"
        >
          Clear selected user
        </button>
      </div>
    );
  }
}

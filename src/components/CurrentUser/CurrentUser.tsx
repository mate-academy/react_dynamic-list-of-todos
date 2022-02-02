import classNames from 'classnames';
import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  onClear: () => void,
};

type State = {
  user: User | null,
  userNotFoundError: boolean,
  isLoading: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    userNotFoundError: false,
    isLoading: false,
  };

  async componentDidMount() {
    await this.loadUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      await this.loadUser();
    }
  }

  async loadUser() {
    try {
      this.setState({
        isLoading: true,
        userNotFoundError: false,
      });
      const user = await getUser(this.props.userId);

      this.setState({
        user,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        userNotFoundError: true,
      });
    }
  }

  render() {
    const { user, userNotFoundError, isLoading } = this.state;

    if (userNotFoundError) {
      return (
        <span>404: User is not found</span>
      );
    }

    if (isLoading || !user) {
      return (
        <span>Loading...</span>
      );
    }

    const {
      id,
      name,
      email,
      phone,
    } = user as User;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${id}`}</span></h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          type="button"
          className={classNames(
            'CurrentUser__clear',
            'button',
            'TodoList__user-button',
            'TodoList__user-button--selected',
          )}
          onClick={() => this.props.onClear()}
        >
          Clear
        </button>
      </div>
    );
  }
}

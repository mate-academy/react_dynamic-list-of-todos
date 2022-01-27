import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';
import { User } from '../../types/types';

type Props = {
  userId: number,
  onClear: () => void;
};

export class CurrentUser extends React.Component<Props, {}> {
  state = {
    user: {} as User,
  };

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(user => {
          this.setState({ user });
        });
    }
  }

  render() {
    const { userId, onClear } = this.props;
    const { name, email, phone } = this.state.user;

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${userId}`}</span>
          </h2>
          <h3 className="CurrentUser__name">{name}</h3>
          <p className="CurrentUser__email">{email}</p>
          <p className="CurrentUser__phone">{phone}</p>
        </div>
        <button
          type="button"
          className="clearUser"
          onClick={onClear}
        >
          Clear
        </button>
      </>
    );
  }
}

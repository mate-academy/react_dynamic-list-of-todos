/* eslint-disable react/no-unused-state */
import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number | null;
  clear: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.PureComponent <Props, State> {
  state = {
    user: {
      name: '',
      id: 0,
      email: '',
      phone: '',
    },
  };

  componentDidMount() {
    getUser(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then((user) => {
          this.setState({ user });
        });
    }
  }

  render() {
    const {
      id,
      phone,
      email,
      name,
    } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          {`User #${id}`}
        </h2>

        <h3 className="CurrentUser__name">
          {name}
        </h3>
        <p className="CurrentUser__email">
          {email}
        </p>
        <p className="CurrentUser__phone">
          {phone}
        </p>

        <button
          type="button"
          onClick={this.props.clear}
        >
          clear
        </button>
      </div>
    );
  }
}

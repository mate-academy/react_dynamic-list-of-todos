import React from 'react';
import { getUser } from '../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  clear: any,
};

export class CurrentUser extends React.Component<Props> {
  state = {
    user: {
      id: 0,
      name: '',
      email: '',
      phone: '',
    },
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps: { userId: number; }) {
    if (prevProps.userId !== this.props.userId) {
      this.getData();
    }
  }

  getData = () => {
    getUser(this.props.userId)
      .then(person => {
        this.setState({ user: person });
      })
      .catch(() => {
        this.setState({ user: null });
      });
  };

  render() {
    const { user } = this.state;
    const { clear } = this.props;

    return (
      <div className="CurrentUser">
        {user ? (
          <>
            <button
              type="button"
              onClick={clear}
            >
              Clear
            </button>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {user.id}
              </span>
            </h2>
            <h3 className="CurrentUser__name">
              {user.name}
            </h3>
            <p className="CurrentUser__email">
              {user.email}
            </p>
            <p className="CurrentUser__phone">
              {user.phone}
            </p>
          </>
        ) : 'NO DATA' }
      </div>
    );
  }
}

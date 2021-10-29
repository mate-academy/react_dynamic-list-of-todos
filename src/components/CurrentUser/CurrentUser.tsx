import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../ api';

type Props = {
  userId: number,
  clear: () => void,
};

type State = {
  currentUser: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    currentUser: null as User | null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  loadUser = () => {
    getUser(this.props.userId)
      .then(userFromServer => {
        this.setState({ currentUser: userFromServer });
      });
  };

  render() {
    const { currentUser } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${currentUser?.name}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {currentUser?.name}
        </h3>
        <p className="CurrentUser__email">{currentUser?.email}</p>
        <p className="CurrentUser__phone">{currentUser?.phone}</p>
        <button
          type="button"
          className="button is-primary is-fullwidth mt-5"
          onClick={this.props.clear}
        >
          Clear
        </button>
      </div>
    );
  }
}

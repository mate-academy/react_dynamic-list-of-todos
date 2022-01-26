import React from 'react';
import { getUser } from '../../api/api';

import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  onSelectedUserId: (selectedUserId: number) => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loader();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loader();
    }
  }

  loader = async () => {
    this.setState({ user: await getUser(this.props.selectedUserId) });
  };

  render() {
    const { user } = this.state;
    const { onSelectedUserId } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user && user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {user && user.name}
        </h3>
        <p className="CurrentUser__email">
          {user && user.email}
        </p>
        <p className="CurrentUser__phone">
          {user && user.phone}
        </p>
        <button
          className="button"
          type="button"
          onClick={() => onSelectedUserId(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}

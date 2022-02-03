import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  selectedUserId: number;
  handelSelectUser: (userId: number) => void;
  handleClear: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadData();
    }
  }

  loadData() {
    getUser(this.props.selectedUserId)
      .then(userFromServer => {
        this.setState({
          user: userFromServer,
        });
      });
  }

  render(): React.ReactNode {
    const { user } = this.state;

    if (!user) {
      return (
        <span>...Waiting</span>
      );
    }

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`Selected user: ${this.props.selectedUserId}`}</span></h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            this.props.handleClear();
          }}
        >
          Clear
        </button>
      </>
    );
  }
}

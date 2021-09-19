import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  selectedUserId: number;
  clear: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUser();
    }
  }

  loadUser = async () => {
    const user = await getUser(this.props.selectedUserId);

    this.setState({ user });
  };

  render() {
    const { user } = this.state;

    return (
      user && (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>

          <button
            type="button"
            className="button CurrentUser__clear"
            onClick={this.props.clear}
          >
            Clear
          </button>
        </>
      )
    );
  }
}

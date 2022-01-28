import React from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../Api/api';

type Props = {
  userId: number,
  click: (id: number) => void;
};

type State = {
  selectedUser: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    selectedUser: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  clear = () => {
    this.setState({ selectedUser: null });
    this.props.click(0);
  };

  async loadUser() {
    const selectedUser = await getUsers(this.props.userId);

    this.setState({ selectedUser });
  }

  render() {
    const { selectedUser: user } = this.state;

    return (
      <>
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:&nbsp;
                {user.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="button CurrentUser__clear"
              onClick={this.clear}
            >
              Clear
            </button>
          </div>
        )}
      </>
    );
  }
}

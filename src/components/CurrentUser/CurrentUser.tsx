import React from 'react';
import { getUser } from '../api/todos';
import './CurrentUser.scss';

type Props = {
  userId: number;
  clear: () => void,
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
    if (this.props.userId !== prevProps.userId) {
      this.loadUser();
    }
  }

  loadUser = async () => {
    const user = await getUser(this.props.userId);

    this.setState({
      selectedUser: user,
    });
  };

  render() {
    const { selectedUser } = this.state;

    return (
      <div className="CurrentUser">
        {selectedUser && (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${this.props.userId}`}</span></h2>
            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>
            <button
              type="button"
              className="CurrentUser__clear"
              onClick={this.props.clear}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}

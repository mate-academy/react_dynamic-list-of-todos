import React from 'react';
import './CurrentUser.scss';
import { User } from '../../react-app-env';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number,
  selectUser: (userId: number) => void,
};

type State = {
  selectedUser: User | null,
};

export class CurrentUser extends React.PureComponent<Props, State> {
  state: State = {
    selectedUser: null,
  };

  async componentDidMount() {
    const user = await getUser(this.props.selectedUserId);

    this.setState({
      selectedUser: user,
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUser();
    }
  }

  clearInfo = () => {
    this.setState(() => ({
      selectedUser: null,
    }));

    this.props.selectUser(0);
  };

  async loadUser() {
    const user = await getUser(this.props.selectedUserId);

    this.setState({ selectedUser: user });
  }

  render() {
    const { selectedUser } = this.state;

    return (
      <div className="CurrentUser">
        {selectedUser && (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUser.id}`}</span></h2>

            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>
            <button
              type="button"
              className="button is-info"
              onClick={this.clearInfo}
            >
              Clear
            </button>
          </>
        )}

      </div>
    );
  }
}

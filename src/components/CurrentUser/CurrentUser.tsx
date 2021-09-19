import React from 'react';
import { loadUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number | null;
  clearUser: () => void;
}

type State = {
  selectedUser: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    selectedUser: null,
  };

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(currentProps: Props) {
    if (currentProps.selectedUserId !== this.props.selectedUserId) {
      this.getUser();
    }
  }

  getUser = async () => {
    let selectedUser: User | null = null;

    if (this.props.selectedUserId) {
      selectedUser = await loadUser(this.props.selectedUserId);
    }

    this.setState({ selectedUser });
  };

  render() {
    const { clearUser } = this.props;
    const { selectedUser } = this.state;

    return selectedUser && (
      <div>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${selectedUser.id}`}</span>
          </h2>
          <h3 className="CurrentUser__name">
            {selectedUser.name}
          </h3>
          <p className="CurrentUser__email">
            {selectedUser.email}
          </p>
          <p className="CurrentUser__phone">
            {selectedUser.phone}
          </p>

          <button
            type="button"
            onClick={() => clearUser()}
            className="button CurrentUser__button"
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

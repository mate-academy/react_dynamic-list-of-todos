import React from 'react';
import { loadUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number;
  clearUser: () => void;
}

type State = {
  selectedUser: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
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
    const selectedUser = await loadUser(this.props.selectedUserId);

    this.setState({ selectedUser });
  };

  render() {
    const { clearUser } = this.props;
    const { selectedUser } = this.state;

    // eslint-disable-next-line no-console
    console.log(selectedUser);

    return selectedUser && (
      <div>
        {/* <div className="CurrentUser">
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
        </div> */}

        <button
          type="button"
          onClick={() => clearUser()}
        >
          Clear
        </button>
      </div>
    );
  }
}

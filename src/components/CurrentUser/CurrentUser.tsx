import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number,
  onClear: () => void,
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

  async loadUser() {
    const selectedUser = await getUser(this.props.userId);

    this.setState({ selectedUser });
  }

  render() {
    const { selectedUser } = this.state;

    return (
      <>
        {selectedUser && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:&nbsp;
                {selectedUser.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>

            <button
              type="button"
              className="button CurrentUser__clear"
              onClick={this.props.onClear}
            >
              Clear
            </button>
          </div>
        )}
      </>
    );
  }
}

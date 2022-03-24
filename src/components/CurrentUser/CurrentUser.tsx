import React from 'react';
import { getUser } from '../../api/api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  setSelectedId: (key: string, id: number) => void;
};

type State = {
  selectedUser: User,
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    selectedUser: {
      id: 0,
      createdAt: '',
      updatedAt: '',
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    },
  };

  componentDidMount() {
    this.loadingData();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedUserId !== prevProps.selectedUserId) {
      this.loadingData();
    }
  }

  loadingData = () => {
    getUser(this.props.selectedUserId)
      .then(user => {
        this.setState({ selectedUser: user });
      });
  };

  render() {
    const { selectedUser } = this.state;

    const { setSelectedId } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUser.id}`}</span></h2>

        <h3 className="CurrentUser__name">{selectedUser.name}</h3>
        <p className="CurrentUser__email">{selectedUser.email}</p>
        <p className="CurrentUser__phone">{selectedUser.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={() => {
            setSelectedId('selectedTodoId', 0);
            setSelectedId('selectedUserId', 0);
          }}
        >
          Clear
        </button>
      </div>
    );
  }
}

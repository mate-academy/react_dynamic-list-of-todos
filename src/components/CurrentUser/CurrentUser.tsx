import React from 'react';
import './CurrentUser.scss';
import * as apiService from '../../api/api';

interface State {
  currentUser: User,
}

type Props = {
  userId: number;
  onClear: () => void;
};

class CurrentUser extends React.Component<Props, State> {
  state = {
    currentUser: {} as User,
  };

  componentDidMount() {
    this.loadUserById();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserById();
    }
  }

  async loadUserById() {
    const currentUser = await apiService.getUserById(this.props.userId);

    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
    const { onClear } = this.props;

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`Selected user: ${currentUser.id}`}</span></h2>

          <h3 className="CurrentUser__name">{currentUser.name}</h3>
          <p className="CurrentUser__email">{currentUser.email}</p>
          <p className="CurrentUser__phone">{currentUser.phone}</p>
        </div>

        <button
          className="CurrentUser__clear button"
          onClick={onClear}
          type="button"
        >
          Clear
        </button>
      </>
    );
  }
}

export default CurrentUser;

import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

interface Props {
  selectedUserId: number
  onFind: (userId:number) => void
  onClean: () => void
}

interface State {
  user: User | null
  loadDataError: boolean
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    loadDataError: false,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    const { selectedUserId } = this.props;

    if (prevProps.selectedUserId !== selectedUserId) {
      this.loadData();
    }
  }

  async loadData() {
    try {
      const { selectedUserId } = this.props;
      const user = await getUser(selectedUserId);

      this.setState({
        user, loadDataError: false,
      });
    } catch (error) {
      this.setState({
        user: null, loadDataError: true,
      });
    }
  }

  render() {
    const { user, loadDataError } = this.state;
    const { onClean } = this.props;

    return (
      <>
        {user
          && (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>
                  Selected user:
                  {' '}
                  {user.id}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>
              <button
                className="button-clear"
                type="button"
                onClick={onClean}
              >
                clear
              </button>
            </div>
          )}
        {loadDataError && <p>User not found</p>}
      </>
    );
  }
}

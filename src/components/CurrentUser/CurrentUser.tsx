import * as React from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api/api';

interface Props {
  selectedUserId: number,
}

type State = {
  user: User | '',
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: '',
  };

  async componentDidMount() {
    const newUser = await getUsers(this.props.selectedUserId);

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({ user: newUser });
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      const newUser = await getUsers(this.props.selectedUserId);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ user: newUser });
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {user !== '' ? user.id : user}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user !== '' ? user.username : user}</h3>
        <p className="CurrentUser__email">{user !== '' ? user.email : user}</p>
        <p className="CurrentUser__phone">{user !== '' ? user.phone : user}</p>
      </div>
    );
  }
}

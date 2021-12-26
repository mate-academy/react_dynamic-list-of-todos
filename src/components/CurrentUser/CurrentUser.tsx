import React from 'react';
import { getUsers } from '../../api';
import { User } from '../../types/User';
import './CurrentUser.scss';

type Props = {
  userId: number,
  selectUser: (arg0: number) => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.getData();
    }
  }

  getData = () => {
    getUsers(this.props.userId)
      .then(result => {
        this.setState({ user: result });
      });
  };

  render() {
    const { selectUser } = this.props;
    const { user } = this.state;

    return (
      <>
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button type="button" onClick={() => selectUser(0)}>
              Clear
            </button>
          </div>
        )}
      </>
    );
  }
}

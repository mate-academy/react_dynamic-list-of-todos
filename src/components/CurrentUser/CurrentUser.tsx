import React from 'react';
import './CurrentUser.scss';
import { getUserFromServer } from '../../api/loadData';

type Props = {
  userId: number,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      this.getUser();
    }
  }

  async getUser() {
    const user = await getUserFromServer(this.props.userId);

    this.setState({ user });
  }

  clearUser = () => {
    this.setState({ user: null });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${this.props.userId}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>

        {user !== null && (
          <button
            type="button"
            className="button"
            onClick={this.clearUser}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

// export const CurrentUser: React.FC<Props> = ({ userId }) => (
//   <div className="CurrentUser">
//     <h2 className="CurrentUser__title">
//       <span>{`Selected user: ${userId}`}</span>
//     </h2>

//     <h3 className="CurrentUser__name">Ervin Howell</h3>
//     <p className="CurrentUser__email">Shanna@melissa.tv</p>
//     <p className="CurrentUser__phone">010-692-6593 x09125</p>
//   </div>
// );

import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../Api';

type Props = {
  selectedUserId: number;
  clearUser: (userId: number) => void;
};

type State = {
  currentUser: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    currentUser: null,
  };

  async componentDidMount() {
    await this.setUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.selectedUserId !== prevProps.selectedUserId) {
      await this.setUser();
    }
  }

  async setUser() {
    const user = await getUser(this.props.selectedUserId);

    this.setState({ currentUser: user });
  }

  render() {
    const { currentUser } = this.state;

    // // eslint-disable-next-line no-console
    // console.log(currentUser);
    // // eslint-disable-next-line no-console
    // console.log(getUser(this.props.selectedUserId));
    // // eslint-disable-next-line no-console
    // console.log(this.props.selectedUserId);

    return currentUser && (
      <div className="CurrentUser">
        <button
          type="button"
          className="button"
          onClick={() => this.props.clearUser(0)}
        >
          Clear
        </button>
        <h2 className="CurrentUser__title"><span>{this.props.selectedUserId}</span></h2>

        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{`Email: ${currentUser.email}`}</p>
        <p className="CurrentUser__phone">{`Phone: ${currentUser.phone}`}</p>
      </div>
    );
  }
}

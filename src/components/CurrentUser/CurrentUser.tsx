import React from 'react';
import { getUser } from '../api';
import './CurrentUser.scss';

type Props = {
  selectedId: number;
  clearSelectedId: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedId !== this.props.selectedId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user = await getUser(this.props.selectedId);

    this.setState({ user });
  }

  render() {
    const { clearSelectedId } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user?.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
        <button className="CurrentUser__clear" type="button" onClick={clearSelectedId}>
          Clear
        </button>
      </div>
    );
  }
}

import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number;
  onClearUser: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    if (this.state.user) {
      const {
        id,
        name,
        email,
        phone,
      } = this.state.user;

      return (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {' '}
                {id}
              </span>
            </h2>
            <h3 className="CurrentUser__name">{name}</h3>
            <p className="CurrentUser__email">{email}</p>
            <p className="CurrentUser__phone">{phone}</p>
          </div>
          <button
            type="button"
            className="button"
            onClick={this.props.onClearUser}
          >
            Clear
          </button>
        </>
      );
    }

    return (
      <div>
        No user selected
      </div>
    );
  }
}

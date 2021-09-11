import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  userId: number,
  handleClick: any,
}

interface State {
  user: User | null,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.requestGetUser();
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.userId !== this.props.userId) {
      this.requestGetUser();
    }
  }

  requestGetUser() {
    getUser(this.props.userId)
      .then(user => {
        this.setState({ user });
      });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {user?.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>

        <button
          className="
            CurrentUser__clear
            button
          "
          type="button"
          onClick={(event => this.props.handleClick(event, 0, 0))}
        >
          Clear
        </button>
      </div>
    );
  }
}

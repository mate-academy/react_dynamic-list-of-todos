import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
      .then(user => this.setState({ user }));
    }
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      (user === null) ?
        <h2>No user selected</h2> :
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>Selected user: {user.id}</span>
          </h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            type="button"
            onClick={() => clearUser()}
          >
            Clear
          </button>
        </div>
    )
  }
}
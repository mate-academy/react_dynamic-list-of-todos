import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUser(this.props.user.userId)
      .then(user => this.setState({ user: user.data }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.userId === this.props.user.userId) {
      return;
    }
    getUser(this.props.user.userId)
      .then(user => this.setState({ user: user.data }));
  }

  render() {
    const { clearUser } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>Selected user: {user.id}</span></h2>
  
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

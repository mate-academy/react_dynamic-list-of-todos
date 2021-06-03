import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadData();
    }
  }

  loadData = () => {
    getUser(this.props.selectedUserId)
      .then(user => this.setState({ user: user.data }));
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <span>User cannot be finded</span>;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>Selected user: {user.id}</span></h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}

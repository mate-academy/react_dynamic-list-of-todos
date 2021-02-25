import React from 'react';
import { CurrentUserType } from '../../types';
import { getUsers } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUsers(this.props.userId)
      .then(user => this.setState({
        user,
      }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    getUsers(this.props.userId).then((user) => {
      if (!user) {
        this.setState({
          user: {},
        });
      }

      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    const { userId, clearUser } = this.props;

    if (!user) {
      return 'No user';
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${userId}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <div className="button__holder">
          <h2> Clear &rarr;</h2>
          <button
            type="button"
            className="plus"
            onClick={clearUser}
          />
        </div>
      </div>
    );
  }
}

CurrentUser.propTypes = CurrentUserType;

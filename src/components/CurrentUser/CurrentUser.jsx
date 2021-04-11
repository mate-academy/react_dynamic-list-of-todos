import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './CurrentUser.scss';

import { getUser } from '../../api/todos';

export class CurrentUser extends React.PureComponent {
  state = {
    currentUser: {},
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.getCurrentUser();
    }
  }

  getCurrentUser = async() => {
    const user = await getUser(this.props.userId);

    this.setState({ currentUser: user });
  }

  render() {
    const { currentUser } = this.state;

    return (
      currentUser
        ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${currentUser.id}`}</span>
            </h2>
            <h3 className="CurrentUser__name">{currentUser.name}</h3>
            <p className="CurrentUser__email">{currentUser.email}</p>
            <p className="CurrentUser__phone">{currentUser.phone}</p>
            <div className="CurrentUser__clear">
              <Button
                color="primary"
                onClick={this.props.removeUser}
              >
                Clear information
              </Button>
            </div>
          </div>
        )
        : <h1 className="CurrentUser__error">Can not find user</h1>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  removeUser: PropTypes.func.isRequired,
};

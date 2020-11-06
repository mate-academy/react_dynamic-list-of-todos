import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { loadUser } from '../../api';
import { Button } from '../Button/Button';

export class CurrentUser extends PureComponent {
  state = {
    user: {},
    userNoFoundError: false,
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedUserId !== prevProps.selectedUserId) {
      this.getUser();
    }
  }

  getUser = async() => {
    try {
      const user = await loadUser(this.props.selectedUserId);

      this.handleShowUser(user);
    } catch (error) {
      this.handleShowError();
    }
  }

  handleShowUser = (user) => {
    this.setState({
      user,
      userNoFoundError: false,
    });
  }

  handleShowError = () => {
    this.setState({
      userNoFoundError: true,
    });
  }

  render() {
    const { user, userNoFoundError } = this.state;
    const { getUserId } = this.props;

    if (userNoFoundError) {
      return (
        <h2 className="CurrentUser__title">
          <span>
            No user with current id
          </span>
        </h2>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {user.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <Button
          onClick={() => getUserId(0)}
          className="CurrentUser__button button"
          content="Clear"
        />
      </div>
    );
  }
}

CurrentUser.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  getUserId: PropTypes.func.isRequired,
};

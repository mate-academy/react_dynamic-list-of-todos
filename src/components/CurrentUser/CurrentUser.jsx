import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api';

export class CurrentUser extends React.PureComponent {
  state = {
    user: {},
    loadError: false,
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    clearUser: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.updateUserInfo(this.props.userId);
  }

  componentDidUpdate = ({ userId }) => {
    const newUserId = this.props.userId;

    if (userId !== newUserId) {
      this.updateUserInfo(newUserId);
    }
  }

  updateUserInfo = async(userId) => {
    try {
      await getUser(userId).then((user) => {
        if (user.data === null) {
          throw new Error('User info missing');
        }

        this.setState({
          user: user.data,
          loadError: false,
        });
      });
    } catch (error) {
      this.setState({
        user: {},
        loadError: true,
      });
    }
  }

  render() {
    const { user, loadError } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {user && user.id}
          </span>
        </h2>

        {loadError
          && (
            <h3 className="CurrentUser__name">
              Unable to load User info
            </h3>
          )
        }

        <h3 className="CurrentUser__name">
          {user && user.name}
        </h3>

        <p className="CurrentUser__email">
          {user && user.email}
        </p>

        <p className="CurrentUser__phone">
          {user && user.phone}
        </p>

        <button
          className="CurrentUser__clear button"
          type="button"
          onClick={clearUser}
        >
          Clear user selection
        </button>
      </div>
    );
  }
}

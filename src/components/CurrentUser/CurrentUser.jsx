import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

class CurrentUser extends React.PureComponent {
  state = {
    user: null,
  };

  async componentDidMount() {
    const { userId } = this.props;

    if (userId) {
      this.setState({
        user: await getUser(userId),
      });
    }
  }

  async componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (userId !== prevProps.userId) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        user: await getUser(userId),
      });
    }
  }

  render() {
    const { user } = this.state;
    const { onChangeUser } = this.props;

    return (
      <>
        {user ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {user.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              onClick={() => onChangeUser(null)}
            >
              clear
            </button>
          </div>
        ) : (
          <span>Loading...</span>
        )
        }
      </>
    );
  }
}

CurrentUser.propTypes = {
  onChangeUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default CurrentUser;

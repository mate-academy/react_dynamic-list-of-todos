import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.PureComponent {
  state = {
    user: {},
  }

  componentDidMount() {
    this.updateUser(this.props.userId);
  }

  componentDidUpdate() {
    this.updateUser(this.props.userId);
  }

  updateUser(newUserId) {
    if (this.state.user && this.state.user.id === newUserId) {
      return;
    }

    getUser(newUserId)
      .then((newUser) => {
        this.setState({
          user: newUser,
        });
      })
      .catch(() => {
        this.setState({
          user: null,
        });
      });
  }

  render() {
    const { user } = this.state;
    const { onButtonClick } = this.props;

    return (
      <div className="CurrentUser">
        {user
          ? (
            <>
              <h2 className="CurrentUser__title">
                <span>
                  {`Selected user: ${user.id}`}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>

              <button
                type="button"
                onClick={() => {
                  onButtonClick();
                }}
                className="btn btn-danger"
              >
                X
              </button>
            </>
          )
          : (
            <p>User is not found</p>
          )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

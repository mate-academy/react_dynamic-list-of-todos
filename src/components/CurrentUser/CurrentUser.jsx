import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then((user) => {
        this.setState({
          user,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then((user) => {
          this.setState({
            user,
          });
        });
    }
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      <>
        {
          user === null ? (
            <h2>Error</h2>
          )
            : (
              <div className="user">
                <h2 className="user__title">
                  <span>{`Selected user: ${user.id}`}</span>
                </h2>

                <h3 className="user__name">{user.name}</h3>
                <p className="user__email">{user.email}</p>
                <p className="user__phone">{user.phone}</p>
                <button
                  className="button"
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    clearUser();
                  }}
                >
                  Clear
                </button>
              </div>
            )
        }
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then((user) => {
        this.setState({
          user: { ...user.data },
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then((user) => {
          this.setState({
            user: { ...user.data },
          });
        });
    }
  }

  clearUser = () => {
    this.setState({
      user: {},
    });

    this.props.clearUserId();
  }

  render() {
    const { id, name, email, phone } = this.state.user;

    return (
      <>
        {Object.keys(this.state.user).length !== 0 && (
          <>
            <div>
              <button
                className="button"
                type="button"
                onClick={this.clearUser}
              >
                Clear
              </button>
            </div>
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>{`Selected user: ${id}`}</span>
              </h2>

              <h3 className="CurrentUser__name">{name}</h3>
              <p className="CurrentUser__email">{email}</p>
              <p className="CurrentUser__phone">{phone}</p>
            </div>
          </>
        )}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUserId: PropTypes.func.isRequired,
};

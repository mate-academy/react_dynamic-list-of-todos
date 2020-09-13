import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.props.getUser(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  componentDidUpdate(PrevProps, PrevState) {
    if (PrevProps.userId === this.props.userId) {
      return;
    }

    this.props.getUser(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      <>
        {this.state.user && (
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
              onClick={clearUser}
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
  getUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

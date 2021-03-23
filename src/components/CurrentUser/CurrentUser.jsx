import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';

export class CurrentUser extends React.Component {
  state = {
    currUser: null,
  }

  async componentDidUpdate(prevProps) {
    const { users } = this.props;

    if (this.props.userId !== prevProps.userId) {

      this.setState({
        currUser: users.find(user => (
          user.id === this.props.userId
        )),
      });
    }
  }

  render() {
    const { userId } = this.props;
    const { currUser } = this.state;

    return (
      <div className="CurrentUser">
        {currUser ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user: ${userId}`}
              </span>
            </h2>
            <h3 className="CurrentUser__name">{currUser.name}</h3>
            <p className="CurrentUser__email">{currUser.email}</p>
            <p className="CurrentUser__phone">{currUser.phone}</p>
            <button
              type="button"
              className="CurrentUser__clear"
              onClick={this.props.clearHandler}
            >
              Clear
            </button>
          </>
        ) : 'No user selected'}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string,
    }).isRequired,
  ).isRequired,
  userId: PropTypes.number.isRequired,
  clearHandler: PropTypes.func.isRequired,
};

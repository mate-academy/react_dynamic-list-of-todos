import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: '',
  }

  componentDidMount() {
    this.props.getInfo(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    this.props.getInfo(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  render() {
    const { userId, clearUserId } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${userId}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          className="CurrentUser__clear"
          onClick={() => {
            this.setState({ user: '' });

            clearUserId();
          }}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  getInfo: PropTypes.func.isRequired,
  clearUserId: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/user';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.changeCurrentUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.changeCurrentUser();
    }
  }

  changeCurrentUser = () => (
    getUser(this.props.userId)
      .then(user => (
        this.setState({ user })
      ))
  )

  render() {
    const { getUserId } = this.props;

    if (!this.state.user) {
      return (
        <h3>
          Loading...
        </h3>
      )
    }

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {this.state.user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{this.state.user.name}</h3>
          <p className="CurrentUser__email">{this.state.user.email}</p>
          <p className="CurrentUser__phone">{this.state.user.phone}</p>

          <button
            type="button"
            className="CurrentUser__button button"
            onClick={() => getUserId(0)}
          >
            Clear
          </button>
        </div>
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  getUserId: PropTypes.func.isRequired,
};

import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({
        selectedUser: user,
      }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(user => this.setState({
          selectedUser: user,
        }));
    }
  }

  render() {
    const { id, name, email, phone } = this.state.selectedUser;

    return (
      <div className="CurrentUser">
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={this.props.clearUser}
        >
          Clear
        </button>
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};

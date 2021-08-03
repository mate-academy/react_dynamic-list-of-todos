import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { request } from '../../api/request';

export class CurrentUser extends React.PureComponent {
  state = {
    user: {},
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  getUser() {
    const selectedUserId = this.props.userId;

    request(`users/${selectedUserId}`)
      .then(user => this.setState({ user }));
  }

  render() {
    const { id, name, email, phone } = this.state.user;
    const { onClick } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {name}
        </h3>
        <p className="CurrentUser__email">
          {email}
        </p>
        <p className="CurrentUser__phone">
          {phone}
        </p>
        <button
          type="button"
          className="CurrentUser__clear button"
          onClick={onClick}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  onClick: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

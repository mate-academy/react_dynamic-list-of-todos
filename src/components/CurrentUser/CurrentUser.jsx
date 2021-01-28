import React from 'react';
import PropTypes from 'prop-types';
import { requestUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  async getUser() {
    const user = await requestUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    if (!this.state.user) {
      return null;
    }

    const { id, name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          className="button CurrentUser__clear"
          type="button"
          onClick={() => {
            this.props.clear();
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
  clear: PropTypes.func.isRequired,
};

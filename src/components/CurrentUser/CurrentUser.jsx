import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUserById } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  clearUser = () => {
    this.setState({ user: null });
  }

  async loadData() {
    const user = await getUserById(this.props.userId);

    this.setState({ user: user.data });
  }

  render() {
    if (this.state.user) {
      const { user: { id, name, email, phone } } = this.state;

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
            type="button"
            onClick={this.clearUser}
          >
            Clear
          </button>
        </div>
      );
    }

    return (
      <div>
        User is not selected
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
};

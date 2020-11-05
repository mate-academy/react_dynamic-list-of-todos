import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
    isLoading: true,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    this.setState({ isLoading: true });
    const user = await getUser(this.props.userId);

    this.setState({
      user,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return this.props.loader();
    }

    return !user ? (
      <h1>User not found</h1>
    )
      : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {user.id}
            </span>
          </h2>
          <button
            type="button"
            className="CurrentUser__clear"
            onClick={this.props.clickHandler}
          >
            Clear
          </button>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
      );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  loader: PropTypes.func.isRequired,
};

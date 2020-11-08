import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
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
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { userId, showInfo } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          className="CurrentUser__clear"
          onClick={showInfo}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  showInfo: PropTypes.func.isRequired,
};

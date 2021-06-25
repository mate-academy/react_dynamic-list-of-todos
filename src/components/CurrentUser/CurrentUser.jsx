import React from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';
import { getUserFromServer } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    const { userId } = this.props;
    const user = await getUserFromServer(userId);

    this.setState({ user: user.data });
  }

  async componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    const user = await getUserFromServer(userId);
    // eslint-disable-next-line
    this.setState({ user: user.data });
  }

  render() {
    const { id, name, email, phone } = this.state.user || '';

    return (
      <>
        {
          this.state.user && (
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
                className="CurrentUser__clear"
                onClick={this.props.clearSelectedUserId}
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
  clearSelectedUserId: PropTypes.func.isRequired,
};

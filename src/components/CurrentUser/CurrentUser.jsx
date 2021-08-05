import React from 'react';
import PropTypes from 'prop-types';
import { loadUser } from '../../utils';

import './CurrentUser.scss';

export class CurrentUser extends React.PureComponent {
  state = {
    user: null,
    isLoading: false,
  }

  componentDidMount() {
    this.getUser();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  async getUser() {
    this.setState({
      isLoading: true,
    });
    const user = await loadUser(this.props.userId);

    this.setState({
      user,
      isLoading: false,
    });
  }

  render() {
    const { user, isLoading } = this.state;
    const { clearUser } = this.props;

    if (!user) {
      return `No user selected`;
    }

    return (
      <div className="CurrentUser">
        {isLoading ? (
          <img
            src="https://i.gifer.com/2cOP.gif"
            alt="loading"
          />
        )
          : (
            <>
              <h2 className="CurrentUser__title">
                <span>{`Selected user: ${user.id}`}</span>
              </h2>
              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>
              <button
                className="button"
                type="button"
                onClick={() => clearUser()}
              >
                Clear
              </button>
            </>
          )
        }
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};

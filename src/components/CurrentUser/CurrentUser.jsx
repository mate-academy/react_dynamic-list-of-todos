import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
    isLoading: false,
    userError: false,
    hasLoadingError: false,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId !== userId) {
      this.loadData();
    }
  }

  async loadData() {
    const { userId } = this.props;

    this.setState({
      isLoading: true,
      hasLoadingError: false,
    });

    try {
      const user = await getUser(userId);

      if (!user) {
        this.setState({ userError: true });
      }

      this.setState({
        user,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        hasLoadingError: true,
      });
    }
  }

  render() {
    const {
      user,
      isLoading,
      userError,
      hasLoadingError,
    } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        {
          (
            isLoading && <h3>Loadings</h3>,
            hasLoadingError && <h3>Error occurred during loading</h3>,
            userError && <h3>Can&apos;t find user</h3>
          )
        }
        {(user && !isLoading)
          && (
            <>
              <h2
                className="CurrentUser__title"
              >
                <span>
                  {`Selected user: ${user.id}`}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>
              <button
                className="button"
                type="button"
                onClick={clearUser}
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

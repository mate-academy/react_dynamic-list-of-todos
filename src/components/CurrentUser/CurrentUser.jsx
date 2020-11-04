import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

export class CurrentUser extends React.PureComponent {
  state = {
    user: {},
    isError: false,
    isLoading: false,
  }

  componentDidMount() {
    this.loadUser(this.props.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser(this.props.userId);
    }
  }

  async loadUser(id) {
    this.setState({ isLoading: true });
    try {
      const user = await getUser(id);

      this.setState({
        user: user.data,
        isError: false,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ isError: true });
    }
  }

  render() {
    const { isError, user, isLoading } = this.state;
    const { clear } = this.props;

    if (isError) {
      return (
        <div>
          <p className="CurrentUser__email">Server has problem</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <button
          type="button"
          className="button"
          onClick={clear}
        >
          Clear
        </button>
        {!user
          ? (
            <h2 className="CurrentUser__title">
              <span>User not found</span>
            </h2>
          )
          : (
            <div>
              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>
            </div>
          )
        }
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
};

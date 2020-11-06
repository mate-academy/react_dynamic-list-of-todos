import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api';
import { Loader } from '../Loader';

export class CurrentUser extends React.PureComponent {
  state = {
    selectedUser: {},
    isLoaded: true,
  }

  async componentDidMount() {
    this.startLoading();
    try {
      const selectedUser = await getUser(this.props.userId);

      this.updateUser(selectedUser);
    } catch (error) {
      this.handleError();
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    this.startLoading();
    try {
      const selectedUser = await getUser(this.props.userId);

      this.updateUser(selectedUser);
    } catch (error) {
      this.handleError();
    }
  }

  handleError = () => {
    this.setState({
      isLoaded: true,
      selectedUser: null,
    });
  }

  startLoading = () => {
    this.setState({
      isLoaded: false,
    });
  }

  updateUser = (userId) => {
    this.setState({
      selectedUser: userId,
      isLoaded: true,
    });
  }

  render() {
    const { userId, onClear } = this.props;
    const { isLoaded, selectedUser } = this.state;

    if (!selectedUser) {
      return (<p>User not found</p>);
    }

    return (
      <>
        {isLoaded ? (
          <div className="CurrentUser">
            <div className="CurrentUser__title">
              <span>
                Selected user:
                {userId}
              </span>
              <button
                type="button"
                className="CurrentUser__clear"
                onClick={onClear}
              >
                Clear
              </button>
            </div>
            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>
          </div>
        ) : <Loader />}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};

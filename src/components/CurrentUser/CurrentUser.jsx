import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: null,
    isUserSelected: false,
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({
        selectedUser: user,
        isUserSelected: true,
      }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(user => this.setState({
          selectedUser: user,
          isUserSelected: true,
        }));
    }
  }

  clearUser = () => {
    this.props.clearId();

    this.setState({
      selectedUser: null,
      isUserSelected: false,
    });
  }

  render() {
    const { selectedUser, isUserSelected } = this.state;

    return (
      <>
        {!isUserSelected
          ? <span>User is not selected</span>
          : (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>
                  User&nbsp;#
                  {selectedUser.id}
                </span>
              </h2>
              <h3 className="CurrentUser__name">
                {selectedUser.name}
              </h3>
              <p className="CurrentUser__email">{selectedUser.email}</p>
              <p className="CurrentUser__phone">{selectedUser.phone}</p>
              <button
                className="TodoList__user-button button"
                type="button"
                onClick={this.clearUser}
              >
                Clear
              </button>
            </div>
          )}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearId: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: null,
  };

  componentDidMount() {
    this.renderUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.renderUser();
    }
  }

  renderUser() {
    getUser(this.props.userId)
      .then(user => this.setState({
        selectedUser: user,
      }));
  }

  render() {
    const { selectedUser } = this.state;

    if (!selectedUser) {
      return <p> Please wait </p>;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {this.props.userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{selectedUser.data.name}</h3>
        <p className="CurrentUser__email">{selectedUser.data.email}</p>
        <p className="CurrentUser__phone">{selectedUser.data.phone}</p>
        <button
          onClick={() => (
            this.props.selectedUser(0)
          )}
          type="button"
        >
          Clear
        </button>
      </div>

    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  selectedUser: PropTypes.func.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../api/api';
import './CurrentUser.scss';

export class CurrentUser extends Component {
  state={
    selectedUser: [],
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  getUser = async() => {
    const user = await getUsers(this.props.userId);

    this.setState({
      selectedUser: user,
    });

    return this.state.selectedUser;
  }

  handleClearClick = () => {
    this.props.clearForm();
    this.setState({
      selectedUser: '',
    });
  }

  render() {
    const { id, name, email, phone } = this.state.selectedUser;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          className="CurrentUser__clear"
          type="button"
          onClick={this.handleClearClick}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearForm: PropTypes.func.isRequired,
};

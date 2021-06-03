import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getData } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.SelectedUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.SelectedUser();
    }
  }

  SelectedUser = async() => {
    const selectedUser = await getData(`/users/${this.props.userId}`);

    this.setState({
      user: selectedUser.data,
    });
  }

  render() {
    const { name, id, email, phone } = this.state.user;

    return (
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
          className="button"
          onClick={() => this.props.clearSelectedUser()}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
};

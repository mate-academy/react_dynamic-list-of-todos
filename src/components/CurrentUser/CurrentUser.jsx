import React, { Component } from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsersId } from '../../utils';

export class CurrentUser extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUsersId(this.props.selectedUserId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { onClick } = this.props;
    const { id, name, email, phone } = user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          className="button button--user"
          onClick={onClick}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};

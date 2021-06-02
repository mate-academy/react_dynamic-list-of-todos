import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { id, name, email, phone } = this.state.user;

    return (
      <div className="currentUser">
        <h2 className="currentUser__title">
          <span>
            {`Selectet user: ${id}`}
          </span>
        </h2>

        <h3 className="currentUser__name">{name}</h3>
        <p className="currentUser__email">{email}</p>
        <p className="currentUser__phone">{phone}</p>

        <button
          type="button"
          className="currentUser__clearButton"
          onClick={this.props.clearSelectedUser}
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

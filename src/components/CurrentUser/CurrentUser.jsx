import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUserById } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.gettingId();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.gettingId();
    }
  }

  async gettingId() {
    const user = await getUserById(this.props.userId);

    this.setState({ user });
  }

  render() {
    if (!this.state.user) {
      return <span>Loading ...</span>;
    }

    const { name, email, phone, id } = this.state.user;

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${id}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{name}</h3>
          <p className="CurrentUser__email">{email}</p>
          <p className="CurrentUser__phone">{phone}</p>
        </div>

        <button
          type="button"
          onClick={this.props.removeUser}
          className="button"
        >
          clear
        </button>
      </>

    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  removeUser: PropTypes.func.isRequired,
};

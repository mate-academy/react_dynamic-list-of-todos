import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    currentUser: {},
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(state) {
    if (state.userId !== this.props.userId && this.state.userId !== 0) {
      this.getUser();
    }
  }

  async getUser() {
    const user = await getUser(this.props.userId);

    if (user === null) {
      this.props.selectUser(0);

      return;
    }

    this.setState({ currentUser: user });
  }

  render() {
    const { id, name, email, phone } = this.state.currentUser;

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
          className="button CurrentUser__clear"
          onClick={() => this.props.selectUser(0)}
        >
          clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

import { getUser } from '../../api/api';

export class CurrentUser extends PureComponent {
  state = {
    user: {},
  }

  async componentDidMount() {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      getUser(this.props.userId)
        .then(data => this.setState({ user: data }));
    }
  }

  render() {
    const { handleUser } = this.props;
    const { name, email, phone, id } = this.state.user;

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
          className="button clear-button"
          type="button"
          onClick={() => handleUser(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  handleUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

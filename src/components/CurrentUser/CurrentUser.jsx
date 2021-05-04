import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then((user) => {
        this.setState({
          selectedUser: user.data,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then((user) => {
          this.setState({
            selectedUser: user.data,
          });
        });
    }
  }

  render() {
    const { id, name, email, phone } = this.state.selectedUser;
    const { clearUser } = this.props;

    if (!Object.keys(this.state.selectedUser).length) {
      return 'Loading...';
    }

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

        <div className="CurrentUser__buttons">
          <button
            type="button"
            className="button"
            onClick={() => {
              clearUser();
            }}
          >
            Clear user
          </button>
        </div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};

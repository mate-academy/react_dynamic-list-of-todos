import React from 'react';
import PropTypes from 'prop-types';
import * as API from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  defaultState = {
    id: '',
    name: 'loading...',
    email: 'loading...',
    phone: 'loading...',
  };

  state = this.defaultState;

  async componentDidMount() {
    this.updateUser(this.props.userId);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.updateUser(this.props.userId);
    }
  }

  updateUser = async(userId) => {
    const user = await API.getUser(userId);

    if (user) {
      this.setState({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    } else {
      this.setState(this.defaultState);
    }
  }

  render() {
    const { resetSelectedUser } = this.props;
    const { id, name, email, phone } = this.state;

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
          onClick={resetSelectedUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  resetSelectedUser: PropTypes.func.isRequired,
};

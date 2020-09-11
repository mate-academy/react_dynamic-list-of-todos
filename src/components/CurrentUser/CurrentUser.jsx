import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUserFromServer } from '../../api';

export class CurrentUser extends React.Component {
  state = {
  }

  componentDidMount() {
    this.setNewData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setNewData();
    }
  }

  setNewData() {
    getUserFromServer(this.props.userId).then((user) => {
      this.setState({
        userId: this.props.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    });
  }

  render() {
    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {this.state.userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{this.state.name}</h3>
        <p className="CurrentUser__email">{this.state.email}</p>
        <p className="CurrentUser__phone">{this.state.phone}</p>

        <button
          type="button"
          onClick={() => {
            this.props.changeSelectedUser(0);
          }}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  changeSelectedUser: PropTypes.func.isRequired,
};

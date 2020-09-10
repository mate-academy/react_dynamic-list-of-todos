import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../API/api';

export class CurrentUser extends React.Component {
  state = {
    user: '',
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(result => this.setState({ user: result }));
  }

  componentDidUpdate(props) {
    if (props.userId === this.props.userId) {
      return;
    }

    getUser(this.props.userId)
      .then(result => this.setState({ user: result }));
  }

  render() {
    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {this.props.userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{this.state.user.name}</h3>
        <p className="CurrentUser__email">{this.state.user.email}</p>
        <p className="CurrentUser__phone">{this.state.user.phone}</p>
        <button
          type="button"
          className="button"
          onClick={() => {
            this.props.selectUser(0);
          }}
        >
          Clear info
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

import React from 'react';
import './CurrentUser.scss';

import PropTypes from 'prop-types';
import { request } from '../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  async componentDidMount() {
    this.updateUserInfo();
  }

  async componentDidUpdate(props) {
    if (this.props.userId !== props.userId) {
      this.updateUserInfo();
    }
  }

  async updateUserInfo() {
    const { userId } = this.props;
    let user = await request('/users');

    user = user.find(person => person.id === userId);
    this.setState({ user });
  }

  render() {
    return (
      <div className="CurrentUser">
        {this.state.user ? (
          <>
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
              style={{
                position: 'relative',
                transform: 'translate(-50%)',
                left: '50%',
                marginTop: '15px',
              }}
              className="TodoList__user-button button"
              onClick={this.props.onClear}
            >
              Clear
            </button>
          </>
        ) : 'no such user found'
        }
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { usersFromServer } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
    users: null,
  }

  componentDidMount() {
    usersFromServer()
      .then((result) => {
        this.setState({
          users: result,
          user: result.filter(person => person.id === this.props.userId),
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState(prevState => ({
        user: prevState.users.filter(person => person.id === this.props.userId),
      }));
    }
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

        {this.state.user && (
          <>
            <h3 className="CurrentUser__name">{this.state.user[0].name}</h3>
            <p className="CurrentUser__email">{this.state.user[0].email}</p>
            <p className="CurrentUser__phone">{this.state.user[0].phone}</p>
            <button
              type="button"
              onClick={this.props.clearUser}
              className="button"
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  clearUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

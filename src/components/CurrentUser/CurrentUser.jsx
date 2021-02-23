import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';

import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    person: null,
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(person => this.setState({
        person,
      }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    getUser(this.props.userId)
      .then(person => this.setState({
        person,
      }));
  }

  render() {
    const { person } = this.state;

    return (!person)
      ? 'No user selected'
      : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {person.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{person.name}</h3>
          <p className="CurrentUser__email">{person.email}</p>
          <p className="CurrentUser__phone">{person.phone}</p>
          <button
            type="button"
            className="CurrentUser__clearBtn"
            onClick={this.props.clearHandler}
          >
            Clear
          </button>
        </div>
      );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearHandler: PropTypes.func.isRequired,
};

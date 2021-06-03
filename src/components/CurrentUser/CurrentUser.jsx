// import { render } from 'node-sass';
import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(({ data: user }) => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(({ data: user }) => {
          this.setState({ user });
        });
    }
  }

  render() {
    const { id, name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {name}
        </h3>
        <p className="CurrentUser__email">
          {email}
        </p>
        <p className="CurrentUser__phone">
          {phone}
        </p>
        <button
          type="button"
          className="CurrentUser__button"
          onClick={this.props.onClear}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};

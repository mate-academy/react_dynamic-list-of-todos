import React from 'react';
import PropTypes from 'prop-types';
import { requestUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    currentUser: null,
  }

  componentDidMount() {
    requestUser(this.props.userId)
      .then(user => this.setState({ currentUser: user }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      requestUser(this.props.userId)
        .then(user => this.setState({ currentUser: user }));
    }
  }

  render() {
    const { currentUser } = this.state;

    if (currentUser) {
      return (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {currentUser.id}
              </span>
            </h2>
            <h3 className="CurrentUser__name">
              {' '}
              {currentUser.name}
              {' '}
            </h3>
            <p className="CurrentUser__email">{currentUser.email}</p>
            <p className="CurrentUser__phone">{currentUser.phone}</p>
          </div>
          <button
            type="button"
            onClick={() => this.props.clear()}

          >
            {' '}
            clear
            {' '}
          </button>
        </>
      );
    }

    return (`not user yet`);
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
};

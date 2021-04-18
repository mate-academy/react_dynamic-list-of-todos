import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../API/api';

export class CurrentUser extends React.Component {
  state = {
    currentUser: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then((result) => {
        this.setState({
          currentUser: result,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then((result) => {
          this.setState({
            currentUser: result,
          });
        });
    }
  }

  render() {
    const { currentUser } = this.state;
    const { clearSelectedUser } = this.props;

    return (
      <>
        { currentUser === null ? (
          <h2>Error load data from server</h2>
        )
          : (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>{`Selected user: ${currentUser.id}`}</span>
              </h2>
              <h3 className="CurrentUser__name">{currentUser.name}</h3>
              <p className="CurrentUser__email">{currentUser.email}</p>
              <p className="CurrentUser__phone">{currentUser.phone}</p>
              <button
                type="button"
                className="button button__clear"
                onClick={() => clearSelectedUser()}
              >
                Clear
              </button>
            </div>
          )}
      </>
    );
  }
}

CurrentUser.propTypes = {
  clearSelectedUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

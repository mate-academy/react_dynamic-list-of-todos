import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api';

export class CurrentUser extends React.PureComponent {
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
    const { clearUser } = this.props;

    return (
      <>
        { currentUser === null ? (
          <h1>Error dataBase</h1>
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
                className="button"
                type="button"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  clearUser();
                }}
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
  clearUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

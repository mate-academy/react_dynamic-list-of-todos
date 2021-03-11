import React from 'react';
import './CurrentUser.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const { userId } = this.props;

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    delay(2000)
      .then(() => getUser(userId))
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    getUser(userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    const { onClear } = this.props;

    return (
      <>
        {Object.keys(user).length
          ? (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>
                  {`Selected user: ${user.id}`}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>
              <div className="CurrentUser__clear">
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onClear}
                  >
                    &#10008; Clear
                  </Button>
                </>
              </div>
            </div>
          )
          : (
            <div className="Preloader">
              <h2 className="Preloader__title">
                <span
                  role="img"
                  aria-label="loading"
                >
                  Please wait&#128578;
                </span>
              </h2>
              <Loader
                type="Circles"
                height={150}
                width={150}
                color="#C0C0C0"
              />
            </div>
          )}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};

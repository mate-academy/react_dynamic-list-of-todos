import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    currentUser: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then((result) => {
        this.setState({
          currentUser: result.data,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then((result) => {
          this.setState({
            currentUser: result.data,
          });
        });
    }
  }

  render() {
    const { currentUser } = this.state;
    const { resetHandler } = this.props;

    return (
      <>
        { currentUser === null ? (
          <h1>Error dataBase</h1>
        ) : (
          <>
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>
                  Selected user:
                  {currentUser.id}
                </span>
              </h2>
              <h3 className="CurrentUser__name">{currentUser.name}</h3>
              <p className="CurrentUser__email">{currentUser.email}</p>
              <p className="CurrentUser__phone">{currentUser.phone}</p>
            </div>
            <Button
              variant="secondary"
              onClick={resetHandler}
            >
              Reset
            </Button>
          </>
        )}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  resetHandler: PropTypes.func.isRequired,
};

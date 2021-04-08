import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import Button from '@material-ui/core/Button';
import { getUser } from '../../api/api';

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
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${currentUser.name}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{currentUser.email}</p>
        <p className="CurrentUser__phone">{currentUser.phone}</p>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            clearUser();
          }}
        >
          Clear
        </Button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  clearUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

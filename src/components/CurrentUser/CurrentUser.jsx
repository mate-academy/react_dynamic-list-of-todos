import React from 'react';
import './CurrentUser.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getUsersById } from '../../app';

export class CurrentUser extends React.PureComponent {
  state = {
    userId: 0,
  }

  componentDidMount() {
    this.chooseTheUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.chooseTheUser();
    }
  }

  chooseTheUser = () => (
    getUsersById(this.props.userId).then(user => (
      this.setState({ userId: user.data }))));

  render() {
    const { userId, clearTheUser } = this.props;
    const { name, email, phone } = this.state.userId;

    return (
      <>
        {(this.state.userId) ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:&nbsp;
                {userId}
              </span>
            </h2>
            <h3 className="CurrentUser__name">{name}</h3>
            <p className="CurrentUser__email">{email}</p>
            <p className="CurrentUser__phone">{phone}</p>
            <div className="CurrentUser__button-container">
              <Button
                onClick={clearTheUser}
                className="CurrentUser__button"
              >
                clear
              </Button>
            </div>
          </div>
        ) : 'No user'}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearTheUser: PropTypes.func.isRequired,
};

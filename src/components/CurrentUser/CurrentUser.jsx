import React from 'react';
import './CurrentUser.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { UsersFromServer } from '../../app';

export class CurrentUser extends React.PureComponent {
  state={
    user: 0,
  }

  componentDidMount() {
    this.change();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.change();
    }
  }

  change = () => (
    UsersFromServer(this.props.userId).then(a => (
      this.setState({ user: a.data }))));

  render() {
    const { userId } = this.props;

    return (
      <>
        {(this.state.user !== null) ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:&nbsp;
                {userId}
              </span>
            </h2>
            <h3 className="CurrentUser__name">{this.state.user.name}</h3>
            <p className="CurrentUser__email">{this.state.user.email}</p>
            <p className="CurrentUser__phone">{this.state.user.phone}</p>
            <div className="CurrentUser__button-container">
              <Button
                onClick={() => this.props.clearTheUser()}
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

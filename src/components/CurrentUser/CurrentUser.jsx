import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.PureComponent {
  state ={
    user: null,
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(user => this.setState({ user }));
    }
  }

  render() {
    const { selectUser } = this.props;
    const { user } = this.state;

    if (!user) {
      return (
        <h2>Please wait...</h2>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="button"
          onClick={() => selectUser(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  selectUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

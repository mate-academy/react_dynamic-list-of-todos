import React from 'react';
import propTypes from 'prop-types';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId !== userId) {
      getUser(userId)
        .then(user => this.setState({ user }));
    }
  }

  render() {
    const { user } = this.state;
    const { id, name, email, phone } = user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: propTypes.number.isRequired,
};

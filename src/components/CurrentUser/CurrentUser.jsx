import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../api';

export class CurrentUser extends React.Component {
state = {
  user: {},
}

componentDidMount() {
  this.userGetData();
}

componentDidUpdate(prevProps) {
  if (prevProps.userId !== this.props.userId) {
    this.userGetData();
  }
}

async userGetData() {
  const userProFile = await getUser(this.props.userId);

  this.setState({
    user: userProFile,
  });
}

render() {
  const {
    id,
    name,
    email,
    phone,

  } = this.state.user;

  return (
    <div className="CurrentUser">
      <button
        type="button"
        onClick={() => this.props.clearOnClick()}
      >
        CLEAR
      </button>
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>
    </div>
  );
}
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearOnClick: PropTypes.func.isRequired,
};

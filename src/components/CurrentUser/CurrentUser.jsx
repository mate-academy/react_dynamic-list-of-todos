import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../helpers';

export class CurrentUser extends React.Component {
state = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};

componentDidMount() {
  this.getData();
}

componentDidUpdate(_, prevState) {
  const { userId } = this.props;

  if (prevState.id !== userId) {
    this.getData();
  }
}

getData() {
  const { userId } = this.props;

  getUser(userId).then(
    ({ id, name, email, phone }) => {
      this.setState(
        {
          id,
          name,
          email,
          phone,
        },
      );
    },
  );
}

render() {
  const { id, name, email, phone } = this.state;
  const { handleClearUserField } = this.props;

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>
      <button
        type="button"
        className="TodoList__user-button
                   TodoList__user-button--selected
                   button"
        onClick={handleClearUserField}
      >
        Clear
      </button>
    </div>
  );
}
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  handleClearUserField: PropTypes.func.isRequired,
};

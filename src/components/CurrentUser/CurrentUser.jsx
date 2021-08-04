import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../utils';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    return this.loadUser();
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return null;
    }

    return this.loadUser();
  }

  async loadUser() {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { name, phone, email, id } = this.state.user;
    const { clearUser } = this.props;

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
          onClick={() => clearUser()}
          className="TodoList__user-button
            TodoList__user-button--unselected
            button"
          type="button"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};

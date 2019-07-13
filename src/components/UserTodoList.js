import React from 'react';
import PropTypes from 'prop-types';

import './UserTodoList.css';
import UserTodos from './UserTodos';

class UserTodoList extends React.Component {
  state={
    isCommentsShown: false,
  }

  handleShowComments = () => {
    this.setState(prevState => ({
      isCommentsShown: !prevState.isCommentsShown,
    }));
  }

  render() {
    const {
      username, email, phone, usertodos,
    } = this.props.user;

    const userTodos = usertodos
      .map(todo => (
        <UserTodos
          key={todo.id}
          todo={todo}
          handleCheckBox={this.props.handleCheckBox}
        />
      ));

    return (
      <div className="user">
        <div className="user__block">
          <h3 className="user-info user-info__header">
          Username:
            {' '}
            {username}
          </h3>

          <p
            className="user-info user-info__additional user-info__email"
          >
            {email}
          </p>

          <p
            className="user-info user-info__additional user-info__phone"
          >
            {phone}
          </p>
        </div>

        <div className="todos--header">
          <h2>Todos</h2>
          <button
            onClick={this.handleShowComments}
            className="button--link"
            type="button"
          >
            {this.state.isCommentsShown ? 'Hide Todos' : 'Show Todos'}
          </button>
        </div>

        <div
          className="todos"
          style={{
            display: this.state.isCommentsShown ? 'block' : 'none',
          }}
        >
          <ul className="todos__list">
            {userTodos}
          </ul>

          <div className="todos__button-container">
            <button
              onClick={this.props.handleSortClickTodos}
              className="button--link"
              type="button"
            >
            Sort by Done
            </button>

            <button
              onClick={this.props.handleSortClickTodos}
              name="titleSort"
              className="button--link"
              type="button"
            >
              Sort by Title
            </button>
          </div>
        </div>

      </div>
    );
  }
}

UserTodoList.propTypes = {
  handleSortClickTodos: PropTypes.func.isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    usertodos: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default UserTodoList;

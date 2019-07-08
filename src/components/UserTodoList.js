import React from 'react';
import PropTypes from 'prop-types';

import './UserTodoList.css';
import UserTodos from './UserTodos';

class UserTodoList extends React.Component {
  state={
    name: 'close',
  }

  handleShowComments = (event) => {
    const { name } = event.target;
    if (name === 'close') {
      this.setState({
        name: 'open',
      });
    } else {
      this.setState({
        name: 'close',
      });
    }
  }

  render() {
    const userTodos = this.props.user.usertodos
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
            {this.props.user.username}
          </h3>

          <p
            className="user-info user-info__additional user-info__email"
          >
            {this.props.user.email}
          </p>

          <p
            className="user-info user-info__additional user-info__phone"
          >
            {this.props.user.phone}
          </p>
        </div>

        <div className="todos--header">
          <h2>Todos</h2>
          <button
            onClick={this.handleShowComments}
            className="button--link"
            name={this.state.name}
          >
            Show Todos
          </button>
        </div>

        <div className="todos" style={{ display: this.state.name === 'open' ? 'block' : 'none' }}>
          <ul className="todos__list">
            {userTodos}
          </ul>

          <div className="todos__button-container">
            <button
              onClick={this.props.handleSortClickTodos}
              className="button--link"
            >
            Sort by Done
            </button>

            <button
              onClick={this.props.handleSortClickTodos}
              name="titleSort"
              className="button--link"
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
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    usertodos: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default UserTodoList;

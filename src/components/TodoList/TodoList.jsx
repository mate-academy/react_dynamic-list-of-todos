import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import { Todo } from '../Todo';

export class TodoList extends React.PureComponent {
  state = {
    search: '',
    filteredTodos: 'all',
  }

  filter = {
    all: () => true,
    completed: todo => todo.completed,
    active: todo => !todo.completed,
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { todos, selectedUserId, onButtonClick } = this.props;
    const { search, filteredTodos } = this.state;
    const todosToShow = todos
      ? (todos.filter(todo => (
        todo.title.includes(search) && this.filter[filteredTodos](todo)
      )))
      : null;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            name="search"
            placeholder="Search"
            className="form-control"
            value={search}
            onChange={this.changeHandler}
          />

          <select
            name="filteredTodos"
            value={filteredTodos}
            onChange={this.changeHandler}
            className="form-control"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">active</option>
          </select>
          <ul className="TodoList__list">
            {todosToShow
              ? (todosToShow.map(todo => (
                <Todo
                  todo={todo}
                  onButtonClick={onButtonClick}
                  isSelectedUser={selectedUserId === todo.userId}
                />
              )))
              : <p>No tasks</p>}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

import React from 'react';
import { todoListType } from '../../types';
import { Todo } from '../Todo';
import './TodoList.scss';

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
    const todoIncludes = todo => todo.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const visibleTodos = todos
      .filter(todo => todo.title
        && todoIncludes(todo)
          && this.filter[filteredTodos](todo));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          name="search"
          placeholder="Type search task"
          className="input is-primary"
          value={search}
          onChange={this.changeHandler}
        />

        <div>
          <div className="select">
            <select
              name="filteredTodos"
              value={filteredTodos}
              onChange={this.changeHandler}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
            </select>
          </div>
          <ul className="TodoList__list">
            {visibleTodos
              ? (visibleTodos.map(todo => (
                <Todo
                  todo={todo}
                  onButtonClick={onButtonClick}
                  isSelectedUser={selectedUserId === todo.userId}
                  key={todo.id}
                />
              )))
              : <p>No tasks</p>}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = todoListType;

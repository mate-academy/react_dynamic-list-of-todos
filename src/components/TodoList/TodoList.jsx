import React from 'react';
import { todoListType } from '../../types';
import { Todo } from '../Todo';
import './TodoList.scss';

export class TodoList extends React.PureComponent {
  state = {
    search: '',
    filteredTodos: 'all',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  filterByTitle = (todo) => {
    const { search } = this.state;

    if (todo.title === null) {
      return false;
    }

    return todo.title.toLowerCase()
      .includes(search.toLowerCase());
  }

  filterByStatus = (todo) => {
    const { filteredTodos } = this.state;

    switch (filteredTodos) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default:
        return true;
    }
  }

  render() {
    const { todos, selectedUserId, selectUser } = this.props;
    const { search, filteredTodos } = this.state;

    const visibleTodos = todos
      .filter(this.filterByTitle)
      .filter(this.filterByStatus);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          name="search"
          placeholder="Type search task"
          className="input is-primary"
          value={search}
          onChange={this.handleChange}
        />

        <div>
          <div className="select">
            <select
              name="filteredTodos"
              value={filteredTodos}
              onChange={this.handleChange}
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
                  selectUser={selectUser}
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

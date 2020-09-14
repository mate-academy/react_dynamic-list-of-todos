import React from 'react';
import PropTypes, { object } from 'prop-types';

import './TodoList.scss';
import { Todos } from './Todos';

export class TodoList extends React.Component {
  state = {
    filter: '',
    showTodosSelector: 'All',
  }

  render() {
    const { todos, selectUser, onToggleToDo } = this.props;

    const selectedTodosByCompleteStatus = todos
      .filter(todo => (
        (this.state.showTodosSelector === 'Completed')
          ? todo.completed === true
          : todo.completed === false
      ));

    const filteredTodosByTitle = this.state.showTodosSelector === 'All'
      ? todos
        .filter(todo => (todo.title !== null))
        .filter(todo => (
          (todo.title).toLowerCase()
            .includes((this.state.filter).toLowerCase())
        ))
      : selectedTodosByCompleteStatus
        .filter(todo => (todo.title !== null))
        .filter(todo => (
          (todo.title).toLowerCase()
            .includes((this.state.filter).toLowerCase())
        ));

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          className="TodoList__filter"
          placeholder="Choose a todo by title"
          value={this.state.filter}
          onChange={(event) => {
            this.setState({
              filter: event.target.value,
            });
          }}
        />
        <select
          className="TodoList__selector-by-completeStatus"
          value={this.state.showTodosSelector}
          onChange={(event) => {
            this.setState({
              showTodosSelector: event.target.value,
            });
          }}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
        <div className="TodoList__list-container">
          {(this.state.filter === '')
            ? (
              <Todos
                todos={
                  this.state.showTodosSelector === 'All'
                    ? todos
                    : selectedTodosByCompleteStatus
                }
                selectUser={selectUser}
                onToggleToDo={onToggleToDo}
              />
            )
            : (
              <Todos
                todos={filteredTodosByTitle}
                selectUser={selectUser}
                onToggleToDo={onToggleToDo}
              />
            )
          }

        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  selectUser: PropTypes.func.isRequired,
  onToggleToDo: PropTypes.func.isRequired,
};

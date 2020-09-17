import React from 'react';
import PropTypes from 'prop-types';
import { getTodos } from '../../api/api';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    initialTodos: [],
    todos: [],
    todoStateSelection: '',
    filteredByState: null,
  }

  componentDidMount() {
    getTodos().then((data) => {
      const todos = data
        .filter(todo => todo.title && todo.id && todo.userId)
        .sort((todo1, todo2) => todo1.userId - todo2.userId);

      this.setState({
        initialTodos: todos,
        todos: [...todos],
      });
    });
  }

  showSelectedState = (value) => {
    if (value) {
      this.setState(state => ({
        todoStateSelection: value,
        filteredByState: state.todos
          .filter(todo => todo.completed === !(+value)),
      }));
    } else {
      this.setState({
        todoStateSelection: '',
        filteredByState: null,
      });
    }
  }

  searchTodo = (value) => {
    if (value.trim()) {
      this.setState(state => ({
        todos: state.todos.filter(todo => todo.title.includes(value)),
      }));
    } else {
      this.setState(state => ({ todos: state.initialTodos }));
    }

    this.showSelectedState(this.state.todoStateSelection);
  }

  changeTodoState = (todoId) => {
    let todoIndex;
    const todoToChange = this.state.todos.find((todo, index) => {
      todoIndex = index;

      return (todo.id === todoId);
    });

    todoToChange.completed = !todoToChange.completed;
    const todosToChange = this.state.todos;

    todosToChange[todoIndex] = todoToChange;
    this.setState(() => ({ todos: todosToChange }));

    this.showSelectedState(this.state.todoStateSelection);
  }

  render() {
    const { todos, filteredByState } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__inputContainer">
          <label htmlFor="filterInput">Filter:</label>
          <input
            type="text"
            id="filterInput"
            className="TodoList__inputField"
            placeholder="Enter the title"
            onChange={event => this.searchTodo(event.target.value)}
          />
        </div>

        <div className="TodoList__inputContainer">
          <label htmlFor="statusSelector">
            Select status
          </label>
          <select
            id="statusSelector"
            className="TodoList__inputSelection"
            onChange={event => this.showSelectedState(event.target.value)}
          >
            <option value="">All</option>
            <option value="1">Active</option>
            <option value="0">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {(filteredByState || todos).map(todo => (
              <li
                key={todo.id}
                className="TodoList__item TodoList__item--unchecked"
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    onClick={() => this.changeTodoState(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => this.props.setUserId(todo.userId)}
                >
                  {`User #${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  setUserId: PropTypes.func.isRequired,
};

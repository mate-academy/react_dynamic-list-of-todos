import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTodos } from '../../api/api';
import './TodoList.scss';

export class TodoList extends Component {
  state = {
    todos: [],
    todosCopy: [],
    inputText: '',
    selectValue: 'all',
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        todos, todosCopy: todos,
      }));
  }

  filteringTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todosCopy.filter(
        todo => todo.title && todo.title.includes(prevState.inputText),
      ),
    }));
  };

  handleSelect = (selectEvent) => {
    const { value } = selectEvent.target;

    this.setState({
      selectValue: value,
    });

    this.setState((prevState) => {
      switch (value) {
        case 'active': return {
          todos: prevState.todosCopy.filter(
            todo => !todo.completed,
          ),
        };

        case 'completed': return {
          todos: prevState.todosCopy.filter(
            todo => todo.completed,
          ),
        };

        default: return { todos: prevState.todosCopy };
      }
    });
  }

  handleChange = (changeEvent) => {
    this.setState({
      inputText: changeEvent.target.value,
    });
    this.filteringTodos();
  };

  shuffle = () => {
    this.setState((prevState) => {
      const shuffleTodos = prevState.todosCopy;
      let currentIndex = shuffleTodos.length;
      let temporaryValue;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = shuffleTodos[currentIndex];
        shuffleTodos[currentIndex] = shuffleTodos[randomIndex];
        shuffleTodos[randomIndex] = temporaryValue;
      }

      return {
        todos: shuffleTodos,
        selectValue: 'all',
      };
    });
  }

  render() {
    const { inputText, selectValue } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <div>
            <input
              type="text"
              name="todos-filter"
              onChange={this.handleChange}
              value={inputText}
              className="search-todos"
            />
            <select
              value={selectValue}
              name="action-filter"
              id="action-filter"
              onChange={this.handleSelect}
              className="select-todos"
            >
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
            </select>
            <button
              onClick={this.shuffle}
              type="button"
              className="Randomize"
            >
              Randomize
            </button>
          </div>
          <ul className="TodoList__list">

            {this.state.todos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item ${todo.completed === true
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'}`}
              >
                <label>
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    button
                  "
                  onClick={() => {
                    this.props.selectUserId(todo.userId);
                  }}
                  type="button"
                >
                  User&nbsp;#
                  {todo.userId}
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
  selectUserId: PropTypes.func.isRequired,
};

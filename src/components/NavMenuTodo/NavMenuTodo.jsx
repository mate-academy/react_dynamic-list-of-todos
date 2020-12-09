import React from 'react';
import './NavMenuTodo.scss';

import { TodoListTypes } from '../TodoList/TodoListTypes';
import { getTodos } from '../../api/api';

export class NavMenuTodo extends React.PureComponent {
  state ={
    initialTodos: [],
    clickedButton: 'All',
  }

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          initialTodos: todos,
        });
      });
  }

  handleUpdateButton = (value) => {
    this.setState({
      clickedButton: value,
    });
  }

  sortedTodosList = (value) => {
    const newTodosList = this.props.todos.filter(
      todo => (
        todo.title !== null
          ? todo.title.toLowerCase().includes(value.toLowerCase())
          : false),
    );

    this.props.updateTodos(newTodosList);
  }

  randomizeTodos = () => {
    const { todos, updateTodos } = this.props;
    const randomTodos = [...todos];

    for (let i = randomTodos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const temp = randomTodos[i];

      randomTodos[i] = randomTodos[j];
      randomTodos[j] = temp;
    }

    updateTodos(randomTodos);
  }

  render() {
    const { updateSelectUserId, updateTodos } = this.props;
    const { clickedButton, initialTodos } = this.state;

    return (
      <div className="nav-menu">
        <input
          type="text"
          placeholder="Tittle...."
          onChange={event => this.sortedTodosList(event.target.value)}
        />
        <div>
          <ul className="filters">
            <li>
              <a
                href="#/all"
                name="All"
                className={clickedButton === 'All' ? 'selected' : ''}
                onClick={(event) => {
                  updateTodos(initialTodos);
                  this.handleUpdateButton(event.target.name);
                }}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/active"
                name="Active"
                className={clickedButton === 'Active' ? 'selected' : ''}
                onClick={(event) => {
                  updateTodos(
                    initialTodos.filter(todo => todo.completed === false),
                  );
                  this.handleUpdateButton(event.target.name);
                }}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/completed"
                name="Completed"
                className={clickedButton === 'Completed' ? 'selected' : ''}
                onClick={(event) => {
                  updateTodos(
                    initialTodos.filter(todo => todo.completed === true),
                  );
                  this.handleUpdateButton(event.target.name);
                }}
              >
                Completed
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="clear-completed"
            onClick={() => updateSelectUserId(0)}
          >
            Clear completed
          </button>
          <button
            type="button"
            className="randomize"
            onClick={this.randomizeTodos}
          >
            Randomize
          </button>
        </div>
      </div>
    );
  }
}

NavMenuTodo.propTypes = TodoListTypes;

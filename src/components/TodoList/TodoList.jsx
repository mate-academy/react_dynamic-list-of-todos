import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { todosFromServer } from '../../api';

export class TodoList extends React.Component {
  state = {
    todos: [],
    title: '',
    select: 'all',
  }

  componentDidMount() {
    todosFromServer()
      .then(todo => this.setState({
        todos: todo,
      }));
  }

  updateTodosInState = () => {
    todosFromServer()
      .then(preparedTodo => this.setState(prevState => (
        { todos: preparedTodo.filter(
          todo => todo.title && todo.title.includes(prevState.title),
        ) })));
  }

  filterTodos = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
    todosFromServer()
      .then(preparedTodo => this.setState((prevState) => {
        switch (value) {
          case 'active':
            return { todos: preparedTodo.filter(todo => !todo.completed) };
          case 'completed':
            return { todos: preparedTodo.filter(todo => todo.completed) };
          default:
            return { todos: preparedTodo };
        }
      }));
  };

  findMatchedTodos = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
    this.updateTodosInState();
  };

  render() {
    const { selectUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.findMatchedTodos}
            placeholder="title"
          />

          <select
            type="text"
            name="select"
            value={this.state.select}
            onChange={this.filterTodos}
          >
            <option>all</option>
            <option>active</option>
            <option>completed</option>
          </select>

          <ul className="TodoList__list">

            {this.state.todos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item TodoList', {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly checked={todo.completed} />
                  <p>{todo.title}</p>
                </label>

                <button
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                  className="TodoList__user-button button"
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
  selectUser: PropTypes.func.isRequired,
};

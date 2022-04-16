import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { getTodos } from '../../api';

type Props = {
  setUserId: (userId: number) => void,
};

type State = {
  currentInput: string,
  statusTodo: string,
  todos: Todo[],
};

export class TodoList extends React.Component<Props, State> {
  state:State = {
    currentInput: '',
    statusTodo: '',
    todos: [],
  };

  componentDidMount() {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      this.setState({
        todos: todosFromServer,
      });
    };

    loadTodosFromServer();
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      currentInput: event.target.value,
    });
  };

  changeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      statusTodo: event.target.value,
    });
  };

  sortTodos = () => {
    const { todos, currentInput, statusTodo } = this.state;
    let copyTodos;

    const lowerCaseCurrentInput = currentInput.toLowerCase();

    switch (statusTodo) {
      case 'active':
        copyTodos = todos.filter((value) => (!value.completed));
        break;
      case 'completed':
        copyTodos = todos.filter((value) => (value.completed));
        break;
      default:
        copyTodos = todos;
        break;
    }

    return copyTodos.filter((value) => {
      if (value.title.toLowerCase().includes(lowerCaseCurrentInput)) {
        return true;
      }

      return false;
    });
  };

  render() {
    const { setUserId } = this.props;
    const todos = this.sortTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          value={this.state.currentInput}
          onChange={this.handleInput}
        />
        <select
          value={this.state.statusTodo}
          onChange={this.changeStatus}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed </option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label htmlFor="checkTodo">
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="TodoList__user-button TodoList__user-button--selected button"
                  type="button"
                  onClick={() => setUserId(todo.userId)}
                >
                  { `User #${todo.userId}` }
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

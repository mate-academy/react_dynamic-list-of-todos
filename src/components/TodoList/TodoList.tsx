import React from 'react';
import ClassNames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void,
};

type State = {
  todoTitle: string,
  status: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todoTitle: '',
    status: 'all',
  };

  handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ todoTitle: event.target.value });
  };

  getFilteredTodo = (): Todo[] => {
    const filteredTodosByTitle = this.props.todos
      .filter(todo => todo.title.includes(this.state.todoTitle));

    if (this.state.status === 'active') {
      return filteredTodosByTitle.filter(todo => !todo.completed);
    }

    if (this.state.status === 'completed') {
      return filteredTodosByTitle.filter(todo => todo.completed);
    }

    return filteredTodosByTitle;
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ status: event.target.value });
  };

  render() {
    const { selectUser } = this.props;
    const { todoTitle, status } = this.state;
    const visibleTodos = this.getFilteredTodo();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          className="input"
          value={todoTitle}
          onChange={this.handleSearchInput}
        />
        <select
          value={status}
          onChange={this.handleSelectChange}
          className="select is-link m-3"
        >
          <option value="all">Show all</option>
          <option value="completed">Show completed</option>
          <option value="active">Show active</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                className={ClassNames('TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })}
                key={todo.id}
              >
                <label htmlFor="todo">
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    id="todo"
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
                  onClick={() => selectUser(todo.userId)}
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

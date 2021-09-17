import React from 'react';
import cn from 'classnames';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  onUserSelection: (userId: number) => void;
}

interface State {
  query: string;
  selectStateOfTodo: string;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    selectStateOfTodo: 'all',
  };

  getTodos = (todos: Todo[]) => {
    const { query, selectStateOfTodo } = this.state;

    let filteredTodos = todos
      .filter(todo => todo.title.includes(query));

    if (selectStateOfTodo === 'active') {
      filteredTodos = filteredTodos
        .filter(todo => !todo.completed);
    } else if (selectStateOfTodo === 'completed') {
      filteredTodos = filteredTodos
        .filter(todo => todo.completed);
    }

    return filteredTodos;
  };

  render() {
    const { query, selectStateOfTodo } = this.state;
    const { todos, onUserSelection } = this.props;

    const filteredTodos = this.getTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            name="todo"
            className="TodoList__input"
            value={query}
            onChange={(event) => {
              this.setState({ query: event.target.value });
            }}
          />
          <select
            name="stateOfTodo"
            className="TodoList__select"
            value={selectStateOfTodo}
            onChange={(event) => {
              this.setState({ selectStateOfTodo: event.target.value });
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <ul className="TodoList__list">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={cn('TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
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
                  onClick={() => {
                    onUserSelection(todo.userId);
                  }}
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

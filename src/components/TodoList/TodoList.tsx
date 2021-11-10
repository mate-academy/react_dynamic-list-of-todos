import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  todos: Todo[],
  selectedUser: number,
  onUserSelect: (userId?: number) => void,
};

type State = {
  todos: Todo[],
  titleQuery: string,
  filter: TodoFilters,
};

enum TodoFilters {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export class TodoList extends React.Component<Props, State> {
  state = {
    todos: this.props.todos,
    titleQuery: '',
    filter: TodoFilters.all,
  };

  setFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    let useValue = TodoFilters.all;

    switch (value) {
      case 'active':
        useValue = TodoFilters.active;
        break;
      case 'completed':
        useValue = TodoFilters.completed;
        break;
      default:
        break;
    }

    this.setState({ filter: useValue });
  };

  setSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ titleQuery: event.target.value });
  };

  getFilteredTodos = () => {
    const { titleQuery, filter, todos } = this.state;

    const filteredTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(titleQuery.toLowerCase())
    ));

    if (filter === TodoFilters.all) {
      return filteredTodos;
    }

    return filteredTodos.filter(todo => (filter === TodoFilters.active
      ? !todo.completed
      : todo.completed
    ));
  };

  randomizeTodos = () => {
    const todos = [...this.state.todos];
    const result = [];

    for (let i = 0; i < this.state.todos.length; i += 1) {
      const randomId = Math.floor(Math.random() * todos.length);

      result.push(todos.splice(randomId, 1)[0]);
    }

    this.setState({ todos: result });
  };

  render() {
    const { selectedUser, onUserSelect } = this.props;
    const { titleQuery, filter } = this.state;
    const filteredTodos = this.getFilteredTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label htmlFor="title-input">
          Title:
          {' '}
          <input
            id="title-input"
            type="text"
            value={titleQuery}
            onChange={this.setSearchQuery}
          />
        </label>

        <br />

        <label htmlFor="select-flter">
          Show:
          {' '}
          <select id="select-flter" value={filter} onChange={this.setFilter}>
            <option value={TodoFilters.all}>
              All
            </option>
            <option value={TodoFilters.active}>
              Active
            </option>
            <option value={TodoFilters.completed}>
              Completed
            </option>
          </select>
        </label>

        <br />

        <button
          type="button"
          onClick={() => {
            this.randomizeTodos();
          }}
        >
          Randomize
        </button>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classnames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
              >
                <label htmlFor={`todo-${todo.id}`}>
                  <input
                    id={`todo-${todo.id}`}
                    type="checkbox"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classnames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': selectedUser === todo.userId },
                  )}
                  type="button"
                  onClick={() => {
                    onUserSelect(todo.userId);
                  }}
                >
                  User&nbsp;
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

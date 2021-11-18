import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';


type Props = {
  todos: Todo[];
  onChecked: (userId: number) => void,
  selectedUserId: number,
};

type State = {
  title: string,
  sortBy: string,
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    sortBy: 'all',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ title: value.toLowerCase() })
  }

  handleSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    this.setState({ sortBy: value })
  }

  getSortedTodos = (todos: Todo[]) => {
    const { sortBy } = this.state;

    if (sortBy !== 'all') {
      switch (sortBy) {
        case 'active':
          return todos.filter(todo => todo.completed === false)
        default:
          return todos.filter(todo => todo.completed === true);
      }
    }

    return todos;
  }

  getSearchedTodos = (todos: Todo[]) => {
    const { title } = this.state;

    if (title) {
      return todos.filter(todo => todo.title.includes(title));
    }

    return todos;
  }

  render() {
    const { onChecked, selectedUserId } = this.props;
    const todosByStatus = this.getSortedTodos(this.props.todos);
    const todos = this.getSearchedTodos(todosByStatus);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleInputChange}
          placeholder="enter title"
        />
        <select
          name="sortBy"
          value={this.state.sortBy}
          onChange={this.handleSelectorChange}
        >
          <option value="all">
            choose all
          </option>
          <option value="complited">
            completed
          </option>
          <option value="active">
            not complited
          </option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', { TodoList__item__unchecked: todo.completed === false }, { TodoList__item__checked: todo.completed === true })}
              >
                { /*eslint-disable*/
                  <label>
                    <input type="checkbox" readOnly />
                    <p>{todo.title}</p>
                  </label>
                }
                <button
                  className={classNames('TodoList__user-button',
                    'button',
                    { TodoList__user_button__selected: todo.userId === selectedUserId })}
                  type="button"
                  onClick={() => onChecked(todo.userId)}
                >
                  User
                  {' '}
                  {todo.userId}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

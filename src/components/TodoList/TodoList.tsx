import React, { ChangeEvent } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface Props {
  todos: Todo[],
  selectUser: (userId: number) => void,
  selectedUserId: number,
}

interface State {
  title: string,
  select: string,
}

export class TodoList extends React.Component<Props, State> {
  state = {
    title: '',
    select: 'all',
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState(prevState => ({
      ...prevState,
      select: event.target.value,
    }));
  };

  filterTodos = (todosFilteredBySelect: Todo[]) => {
    return todosFilteredBySelect.filter(todo => (
      todo.title.toLowerCase().includes(this.state.title.toLowerCase())
    ));
  };

  readyTodos = () => {
    const { todos } = this.props;
    const { select } = this.state;

    switch (select) {
      case 'all':
        return this.filterTodos(todos);

      case 'completed':
        return this.filterTodos(todos.filter(todo => todo.completed));

      case 'active':
        return this.filterTodos(todos.filter(todo => !todo.completed));

      default:
        throw new Error('Error');
    }
  };

  render() {
    const { selectedUserId, selectUser } = this.props;
    const { title } = this.state;

    return (
      <div className="TodoList">
        <input
          type="text"
          value={title}
          onChange={this.handleInputChange}
        />

        <select onChange={this.handleSelectChange}>
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="active">active</option>
        </select>

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.readyTodos().map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
              >
                <label htmlFor="checkbox">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'TodoList__user-button--selected',
                    'button',
                    { active: selectedUserId === todo.userId },
                  )}
                  type="button"
                  onClick={() => selectUser(todo.userId)}
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

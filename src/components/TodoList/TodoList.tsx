import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  id: number;
  selectedUser: (value: number) => void;
};

type State = {
  title: string;
  filterBy: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    filterBy: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const key: keyof State = name as keyof State;

    this.setState({
      [key]: value,
    } as Pick<State, keyof State>);
  };

  getFilteredTodos = () => {
    const { todos } = this.props;

    return todos
      .filter(todo => (
        todo.title && todo.title.toLowerCase().includes(this.state.title.toLowerCase())))
      .filter(todo => {
        switch (this.state.filterBy) {
          case 'Active':
            return !todo.completed;
          case 'Completed':
            return todo.completed;
          case 'All':
          default:
            return todos;
        }
      });
  };

  render() {
    const { id } = this.props;
    const { title, filterBy } = this.state;
    const todos = this.getFilteredTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__form">
          <input
            className="TodoList__item"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />

          <select
            name="filterBy"
            className="TodoList__item"
            value={filterBy}
            onChange={this.handleChange}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label>
                  <input type="checkbox" readOnly />
                  {todo.title}
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected': todo.userId === id,
                    },
                  )}
                  type="button"
                  onClick={() => {
                    this.props.selectedUser(todo.userId);
                  }}
                >
                  User
                  {`#${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

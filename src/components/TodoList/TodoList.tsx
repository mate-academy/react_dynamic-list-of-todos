import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectUser: (userId: number) => void;
};

type State = {
  query: string;
  filterBy: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    query: '',
    filterBy: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  getFilteredTodos = (todos: Todo[]) => {
    let visibleTasks = [...todos].filter(todo => {
      switch (this.state.filterBy) {
        case 'Active':
          return !todo.completed;
        case 'Completed':
          return todo.completed;
        case 'All':
        default:
          return todo;
      }
    });

    visibleTasks = visibleTasks
      .filter(todo => (todo.title
        && todo.title.toLocaleLowerCase().includes(this.state.query.toLocaleLowerCase())));

    return visibleTasks;
  };

  render() {
    const { query, filterBy } = this.state;
    const { todos, selectUser } = this.props;
    const filteredTodos = this.getFilteredTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__form">
          <input
            type="text"
            name="query"
            value={query}
            className="TodoList__item item"
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
            {filteredTodos.map((todo) => (
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
                    selectUser(todo.userId);
                  }}
                >
                  User&nbsp;#1
                  {todo.userId}
                </button>
              </li>
            ))}

            <li className="TodoList__item TodoList__item--checked">
              <label>
                <input type="checkbox" checked readOnly />
                <p>distinctio vitae autem nihil ut molestias quo</p>
              </label>

              <button
                className="TodoList__user-button button"
                type="button"
              >
                User&nbsp;#2
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  onUsersId: (userId: number) => void;
};

type State = {
  filteredQuery: string,
  selectedQuery: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    filteredQuery: '',
    selectedQuery: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'filterQuery') {
      this.setState({ filteredQuery: value, selectedQuery: 'Choose todo' });
    }

    if (name === 'selectedQuery') {
      this.setState({ filteredQuery: '', selectedQuery: value });
    }
  };

  getFilteredTodos = () => {
    const { todos } = this.props;
    const query = this.state.filteredQuery.toLowerCase();

    switch (this.state.selectedQuery) {
      case 'all':
        return todos;

      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos
          .filter((todo: Todo) => (
            todo.title && todo.title.toLowerCase().includes(query)
          ));
    }
  };

  render() {
    const { filteredQuery, selectedQuery } = this.state;
    const { onUsersId } = this.props;
    const filtredTodos = this.getFilteredTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__form">
          <label className="TodoList__label" htmlFor="filterTitle">
            <input
              type="text"
              name="filterQuery"
              id="filterTitle"
              className="form-control"
              placeholder="find title"
              value={filteredQuery}
              onChange={this.handleChange}
            />
          </label>

          <label className="TodoList__label" htmlFor="selectedTodo">
            <select
              name="selectedQuery"
              id="selectedTodo"
              value={selectedQuery}
              className="form-control"
              onChange={this.handleChange}
            >
              <option value="Choose todo">Choose todo</option>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filtredTodos.map(todo => (
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
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => onUsersId(todo.userId)}
                >
                  {`User:${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

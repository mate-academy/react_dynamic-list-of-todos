import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  selectUser: (userId: number) => void;
};

type State = {
  query: string;
  filteredBySelect: string;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
    filteredBySelect: 'all',
  };

  changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  changeFilteredBySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      filteredBySelect: event.target.value,
    });
  };

  render() {
    const { todos, selectUser, selectedUserId } = this.props;
    const { query, filteredBySelect } = this.state;
    let filteredTodos = todos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    if (this.state.filteredBySelect === 'completed') {
      filteredTodos = filteredTodos.filter(
        todo => todo.completed,
      );
    }

    if (this.state.filteredBySelect === 'active') {
      filteredTodos = filteredTodos.filter(
        todo => !todo.completed,
      );
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            value={query}
            onChange={this.changeQuery}
            className="form-control"
            placeholder="Enter text here"
          />
          <select
            name="filteredBySelect"
            value={filteredBySelect}
            onChange={this.changeFilteredBySelect}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
          <ul className="TodoList__list">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={`
                TodoList__item 
                TodoList__item${todo.completed
                ? '--checked'
                : '--unchecked'}`}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={todo.userId === selectedUserId
                    ? 'TodoList__user-button--selected button'
                    : 'button'}
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
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

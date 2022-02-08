import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import 'bulma';

type Props = {
  handleUserIdChange: (todo: Todo) => void;
  todos: Todo[],
};

type State = {
  query: string;
  selectedStatus: string,
  selectedTodoId: number,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
    selectedStatus: '',
    selectedTodoId: 0,
  };

  handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  getAllTodos = () => {
    return this.props.todos;
  };

  getActive = () => {
    return this.props.todos.filter(todo => todo.completed === false);
  };

  getCompleted = () => {
    return this.props.todos.filter(todo => todo.completed === true);
  };

  getVisibleTodos = () => {
    const { todos } = this.props;
    const searchQuery = this.state.query.toLowerCase();

    let filtered = todos.filter(todo => todo.title.toLowerCase().includes(searchQuery));

    switch (this.state.selectedStatus) {
      case 'active':
        filtered = filtered.filter(todo => todo.completed === false);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed === true);
        break;
      default:
        return filtered;
    }

    return filtered;
  };

  handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedStatus: event.target.value,
    });
  };

  render() {
    const { handleUserIdChange } = this.props;
    const { selectedTodoId } = this.state;
    const filteredTodos = this.getVisibleTodos();

    return (
      <div className="TodoList">
        <h2 className="title">Todos:</h2>

        <div className="box">
          <div className="field">
            <label htmlFor="search-query" className="label">
              Search Todo
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={this.state.query}
                onChange={this.handleTodoChange}
              />
            </label>
          </div>

          <div className="select is-small">
            <select
              name="todosStatus"
              value={this.state.selectedStatus}
              onChange={this.handleStatusChange}
            >
              <option value="allTodos">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                className={
                  classNames(
                    'TodoList__item',
                    { 'TodoList__item--unchecked': selectedTodoId !== todo.id },
                    { 'TodoList__item--checked': selectedTodoId === todo.id },
                  )
                }
                key={todo.id}
              >
                <label htmlFor={`checkbox-${todo.id}`}>
                  {/* <input type="checkbox" readOnly /> */}
                  <input
                    type="checkbox"
                    id={`checkbox-${todo.id}`}
                    onClick={() => {
                      this.setState({
                        selectedTodoId: todo.id,
                      });
                    }}
                    // readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    button
                    TodoList__user-button
                    TodoList__user-button--selected
                  "
                  type="button"
                  key={todo.id}
                  onClick={() => handleUserIdChange(todo)}
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

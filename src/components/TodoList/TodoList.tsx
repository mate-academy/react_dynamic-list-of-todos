import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  todos: Todo[],
  setUserId: (userId: number) => void
  selectedId: number,
};

type State = {
  query: string,
  selectValue: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
    selectValue: '',
  };

  inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  filterTodos = () => {
    return this.filterBySelect()
      .filter(todo => {
        const lowerQuery = this.state.query.toLowerCase();
        const lowerTitle = todo.title.toLowerCase();

        return lowerTitle.includes(lowerQuery);
      });
  };

  changeSelectedValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectValue: event.target.value,
    });
  };

  filterBySelect = () => {
    switch (this.state.selectValue) {
      case 'Active':
        return this.props.todos.filter(todo => todo.completed === false);

      case 'Completed':
        return this.props.todos.filter(todo => todo.completed === true);

      default:
        return this.props.todos;
    }
  };

  render() {
    const filteredTodos = this.filterTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__list-filters">
          <input
            type="text"
            className="TodoList__title-input"
            placeholder="Title"
            value={this.state.query}
            onChange={this.inputHandler}
          />
          <select
            value={this.state.selectValue}
            onChange={this.changeSelectedValue}
            className="TodoList__select"
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classnames({
                  TodoList__item: true,
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label htmlFor={`Todo-${todo.id}`}>
                  <input
                    type="checkbox"
                    id={`Todo-${todo.id}`}
                    readOnly
                    checked={todo.completed}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classnames({
                    'TodoList__user-button button': true,
                    'TodoList__user-button--selected': this.props.selectedId === todo.userId,
                  })}
                  type="button"
                  onClick={() => this.props.setUserId(todo.userId)}
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

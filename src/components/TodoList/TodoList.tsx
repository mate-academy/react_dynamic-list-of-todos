import React from 'react';
import './TodoList.scss';
import className from 'classnames';

interface Props {
  selectedUserId: number,
  todos: Todo[];
  onUserSelect: (userId: number) => void,
}

interface State {
  inputFilterValue: string,
  selectFilterValue: string,
}

export class TodoList extends React.Component<Props, State> {
  state = {
    inputFilterValue: '',
    selectFilterValue: 'all',
  };

  filterHandler = (event: FilterEvent) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  compareText = (title: string, inputFilterValue: string) => {
    return title.toLowerCase().includes(inputFilterValue.toLowerCase());
  };

  filterBySelect = (todos: Todo[], selectFilterValue: string) => {
    switch (selectFilterValue) {
      case 'completed':
        return todos.filter(({ completed }) => completed);
      case 'not-completed':
        return todos.filter(({ completed }) => !completed);
      default:
        return todos;
    }
  };

  getVisibleTodos = (todos: Todo[]) => {
    const { inputFilterValue, selectFilterValue } = this.state;

    const visibleTodos = todos
      .filter(({ title }) => this.compareText(title, inputFilterValue));

    return this.filterBySelect(visibleTodos, selectFilterValue);
  };

  render() {
    const { selectedUserId, todos, onUserSelect } = this.props;
    const { inputFilterValue, selectFilterValue } = this.state;

    const visibleTodos = this.getVisibleTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            name="inputFilterValue"
            type="text"
            placeholder="Filter by task title"
            value={inputFilterValue}
            onChange={this.filterHandler}
          />

          <select
            className="TodoList__select"
            name="selectFilterValue"
            id="select-filter"
            value={selectFilterValue}
            onChange={this.filterHandler}
          >
            <option value="all">
              Select all
            </option>
            <option value="completed">
              Select completed
            </option>
            <option value="not-completed">
              Select not completed
            </option>
          </select>

          <ul className="TodoList__list">
            {visibleTodos.map(visibleTodo => (
              <li
                key={visibleTodo.id}
                className={className(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': visibleTodo.completed,
                    'TodoList__item--unchecked': !visibleTodo.completed,
                  },
                )}
              >
                <label htmlFor={`${visibleTodo.id}`}>
                  <input
                    id={`${visibleTodo.id}`}
                    type="checkbox"
                    checked={visibleTodo.completed}
                    readOnly
                  />
                  <p>{visibleTodo.title}</p>
                </label>

                <button
                  className={className(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': selectedUserId === visibleTodo.userId },
                  )}
                  type="button"
                  onClick={() => onUserSelect(visibleTodo.userId)}
                >
                  {`User #${visibleTodo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

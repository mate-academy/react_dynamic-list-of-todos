import React from 'react';
import './TodoList.scss';
import cn from 'classnames';

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
            name="filter-by-title"
            type="text"
            placeholder="Filter by task title"
            value={inputFilterValue}
            onChange={(event) => {
              this.setState({
                inputFilterValue: event.target.value,
              });
            }}
          />

          <select
            name="select-filter"
            id="select-filter"
            value={selectFilterValue}
            onChange={(event) => {
              this.setState({
                selectFilterValue: event.target.value,
              });
            }}
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
                className={cn(
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
                  className={cn(
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

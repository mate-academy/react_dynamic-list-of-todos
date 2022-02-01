import React from 'react';
import './TodoList.scss';
import cn from 'classnames';

type Props = {
  selectedUserId: number,
  todos: Todo[];
  selectOfUser: (userId: number) => void,
};

type State = {
  searchOfTitle: string,
  selectStatus: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    searchOfTitle: '',
    selectStatus: 'all',
  };

  filterHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  compareText = (title: string, searchOfTitle: string) => {
    return title.toLowerCase().includes(searchOfTitle.toLowerCase());
  };

  filterBySelect = (todos: Todo[], selectStatus: string) => {
    switch (selectStatus) {
      case 'completed':
        return todos.filter(({ completed }) => completed);
      case 'not-completed':
        return todos.filter(({ completed }) => !completed);
      default:
        return todos;
    }
  };

  getVisibleTodos = (todos: Todo[]) => {
    const { searchOfTitle, selectStatus } = this.state;

    const visibleTodos = todos
      .filter(({ title }) => this.compareText(title, searchOfTitle));

    return this.filterBySelect(visibleTodos, selectStatus);
  };

  render() {
    const { selectedUserId, todos, selectOfUser } = this.props;
    const { searchOfTitle, selectStatus } = this.state;

    const visibleTodos = this.getVisibleTodos(todos);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            name="searchOfTitle"
            type="text"
            placeholder="Filter by title"
            value={searchOfTitle}
            onChange={this.filterHandler}
          />

          <select
            name="selectStatus"
            value={selectStatus}
            onChange={this.filterHandler}
          >
            <option value="all">
              select all
            </option>
            <option value="completed">
              select completed
            </option>
            <option value="not-completed">
              select not completed
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
                <input
                  type="checkbox"
                  checked={visibleTodo.completed}
                  readOnly
                />
                <p>{visibleTodo.title}</p>

                <button
                  className={cn(
                    'button',
                    'TodoList__user-button',
                    { 'TodoList__user-button--selected': selectedUserId === visibleTodo.userId },
                  )}
                  type="button"
                  onClick={() => selectOfUser(visibleTodo.userId)}
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

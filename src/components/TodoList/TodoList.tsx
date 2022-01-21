import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../types/Todos';

enum SelectOption {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  todos: Todo[],
  selectedUserId: number,
  userSelected: (userId: number) => void,
};

type State = {
  searchTitle: string,
  randomVisibleTodos: boolean;
  selectedTodos: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    searchTitle: '',
    selectedTodos: SelectOption.all,
    randomVisibleTodos: false,
  };

  visibleTodo = () => {
    const { todos } = this.props;
    const { searchTitle, selectedTodos, randomVisibleTodos } = this.state;

    let filterBySearch = todos.filter(todo => {
      const todoTitle = todo.title.toLowerCase();
      const textSearch = searchTitle.toLowerCase();

      return todoTitle.includes(textSearch);
    });

    switch (selectedTodos) {
      case SelectOption.active:
        filterBySearch = filterBySearch.filter(todo => !todo.completed);
        break;

      case SelectOption.completed:
        filterBySearch = filterBySearch.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    if (randomVisibleTodos) {
      filterBySearch.sort(() => 0.5 - Math.random());
    }

    return filterBySearch;
  };

  render() {
    const todoOnList = this.visibleTodo();
    const { userSelected, selectedUserId } = this.props;
    const { searchTitle, randomVisibleTodos } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <label htmlFor="search-text" className="TodoList__label">
          Search todo
          <input
            type="text"
            id="search-text"
            className="TodoList__label--input"
            placeholder="Todo title"
            value={searchTitle}
            onChange={(event) => {
              this.setState({
                searchTitle: event.target.value,
              });
            }}
          />
        </label>

        <label htmlFor="select-todo" className="TodoList__label">
          Select Todo
          <select
            name="select-todo"
            id="select-todo"
            className="TodoList__label--select"
            value={this.state.selectedTodos}
            onChange={(event) => {
              this.setState({
                selectedTodos: event.target.value,
              });
            }}
          >
            {Object.values(SelectOption).map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="button"
          onClick={() => {
            this.setState(state => ({
              randomVisibleTodos: !state.randomVisibleTodos,
            }));
          }}
        >
          {randomVisibleTodos ? 'in order' : 'randomize'}
        </button>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todoOnList.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label htmlFor={`todo ${todo.id}`}>
                  <input
                    type="checkbox"
                    id={`todo ${todo.id}`}
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => userSelected(todo.userId)}
                >
                  {`User ${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

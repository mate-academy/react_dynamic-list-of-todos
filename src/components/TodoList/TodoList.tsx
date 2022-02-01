import React from 'react';
import './TodoList.scss';
import cn from 'classnames';
import { Input } from 'antd';
import { Todo } from '../types/Todo';

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
  selectedTodos: string,
  randomVisibleTodos: boolean,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    searchTitle: '',
    selectedTodos: SelectOption.all,
    randomVisibleTodos: false,

  };

  selectedUserId = () => { };

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
    const { searchTitle, selectedTodos, randomVisibleTodos } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <Input
          size="large"
          placeholder="Search for todo by title"
          className="TodoList__search"
          value={searchTitle}
          onChange={(event) => {
            this.setState({
              searchTitle: event.target.value,
            });
          }}
        />
        <select
          className="TodoList__search"
          value={selectedTodos}
          onChange={(event) => {
            this.setState({
              selectedTodos: event.target.value,
            });
          }}
        >
          {Object.values(SelectOption).map(item => (
            <option value={item} key={item}>{item}</option>
          ))}
        </select>
        <br />
        <button
          type="button"
          className="button"
          onClick={() => {
            this.setState(state => ({
              randomVisibleTodos: !state.randomVisibleTodos,
            }));
          }}
        >
          {randomVisibleTodos ? 'Order' : 'Shuffle'}
        </button>
        <p className="text">
          List sorted in
          {' '}
          <b>{`${randomVisibleTodos ? 'SHUFFLE' : 'ORDER'}`}</b>
          {' '}
          mode
        </p>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todoOnList.map(todo => (
              <li
                key={todo.title}
                className={cn('TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed })}
              >
                <label htmlFor={`todo${todo.id}`}>
                  <input
                    type="checkbox"
                    id={`todo${todo.id}`}
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={cn(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => userSelected(todo.userId)}
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

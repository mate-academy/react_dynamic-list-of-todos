import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';

type Props = {
  todos: Todo[]
  selectUser: (userId: number) => void,
  changeTodoStatus: (todoId: number) => void,
  selectedId: number,
};

type State = {
  query: string,
  selectValue: string,
  buttonSelected: boolean,
};

export class TodoList extends React.PureComponent<Props, State> {
  state: State = {
    query: '',
    selectValue: '',
    buttonSelected: false,
  };

  handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState(() => ({
      query: value,
    }));
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    this.setState(() => ({
      selectValue: value,
    }));
  };

  selectButton = () => {
    this.setState(state => ({
      buttonSelected: !state.buttonSelected,
    }));
  };

  filterTodosBySearch = () => {
    return this.filterTodosBySelect()
      .filter(todo => {
        const titleLower = todo.title.toLowerCase();
        const queryLower = this.state.query.toLowerCase();

        return titleLower.includes(queryLower);
      });
  };

  filterTodosBySelect = () => {
    switch (this.state.selectValue) {
      case 'All todos':
        return this.props.todos;
      case 'Active todos':
        return this.props.todos.filter(todo => todo.completed === false);
      case 'Completed todos':
        return this.props.todos.filter(todo => todo.completed === true);
      default:
        return this.props.todos;
    }
  };

  render() {
    const { selectUser, selectedId, changeTodoStatus } = this.props;
    const {
      query,
      selectValue,
    } = this.state;

    const filteredTodos = this.filterTodosBySearch();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <input
          type="text"
          placeholder="Title"
          value={query}
          onChange={this.handleSearchInput}
        />

        <select value={selectValue} onChange={this.handleSelect}>
          <option value="All todos">All todos</option>
          <option value="Active todos">Active todos</option>
          <option value="Completed todos">Completed todos</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              >
                <label htmlFor={`Todo-${todo.id}`}>
                  <input
                    type="checkbox"
                    id={`Todo-${todo.id}`}
                    checked={todo.completed}
                    onChange={() => {
                      changeTodoStatus(todo.id);
                    }}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected': selectedId === todo.userId,
                  })}
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                    this.selectButton();
                  }}
                >
                  User&nbsp;
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

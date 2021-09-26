import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { getTodos } from '../../api/api';

interface State {
  todos: Todo[],
  titleSearch: string,
  filterStatus: string,
}

interface Props {
  getUserId: (userId: number) => void;
  selectedUserId: number,
}
export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    titleSearch: '',
    filterStatus: '',
  };

  componentDidMount(): void {
    getTodos()
      .then(todos => (
        this.setState({ todos })
      ));
  }

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ titleSearch: event.target.value });
  };

  handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ filterStatus: event.target.value });
  };

  filterTodos = () => {
    const { todos, titleSearch, filterStatus } = this.state;
    let visibleTodos = todos.filter(todo => (
      todo.title.toLowerCase().includes(titleSearch.toLowerCase())
    ));

    if (filterStatus) {
      visibleTodos = visibleTodos.filter(todo => {
        switch (filterStatus) {
          case 'all':
            return todo;
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return 0;
        }
      });
    }

    return visibleTodos;
  };

  render() {
    const visibleTodos = this.filterTodos();
    const { titleSearch, filterStatus } = this.state;
    const { getUserId, selectedUserId } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <form className="TodoList__form">
          <input
            className="TodoList__input"
            placeholder="Filter todos"
            type="text"
            id="input-search"
            value={titleSearch}
            onChange={(event) => this.handleChangeInput(event)}
          />
          <select
            className="TodoList__select"
            name="status"
            value={filterStatus}
            onChange={(event) => this.handleChangeSelect(event)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': todo.userId === selectedUserId },
                  )}
                  type="button"
                  onClick={() => getUserId(todo.userId)}
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

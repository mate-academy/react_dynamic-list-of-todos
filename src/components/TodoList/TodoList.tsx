import React from 'react';
import 'bulma';
import classNames from 'classnames';
import './TodoList.scss';

interface State {
  searchPut: string;
  sortBy: string;
}

interface Props {
  todos: Todo[];
  setUser: (id: number) => Promise<void>;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    searchPut: '',
    sortBy: 'all',
  };

  isVisible = (todo: Todo) => {
    const { title, completed } = todo;
    const { searchPut, sortBy } = this.state;
    const search = title.toLowerCase().includes(searchPut.toLowerCase());

    if (!search) {
      return false;
    }

    if (sortBy === 'all') {
      return true;
    }

    const isDone = completed && sortBy === 'completed';
    const isActive = !completed && sortBy === 'active';

    return isDone || isActive;
  };

  handleChange = (key: string, value: string) => {
    this.setState({
      [key]: value,
    } as Pick<State, keyof State>);
  };

  render() {
    const { searchPut } = this.state;
    const { todos, setUser } = this.props;

    const visibleTodos = todos.filter(this.isVisible);

    return (
      <div className="TodoList">
        <h2 className="title">Todos:</h2>

        <input
          className="input is-link"
          type="text"
          value={searchPut}
          placeholder="Search"
          onChange={event => this.handleChange('searchPut', event.target.value)}
        />

        <div className="TodoList__select-group my-3 pl-3">
          {'Sorted by: '}
          <div className="select">
            <select onChange={event => this.handleChange('sortBy', event.currentTarget.value)}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )}
              >
                <label htmlFor="input">
                  <input
                    type="checkbox"
                    id="input"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'button',
                    { 'is-success': todo.completed },
                    { 'is-danger': !todo.completed },
                  )}
                  type="button"
                  onClick={() => setUser(todo.userId)}
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

export default TodoList;

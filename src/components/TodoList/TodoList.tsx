import classNames from 'classnames';
import React from 'react';
import { getTodos } from '../../api/api';
import { FilterForm } from '../FilterForm';
import './TodoList.scss';

type State = {
  todos: Todo[];
  filteredTodos: Todo[];
};

type Props = {
  selectedUserId: number;
  selectUser: (userId: number) => void;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    filteredTodos: [],
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
      filteredTodos: todos,
    });
  }

  handleFilterTodos = (filterTodos: FilterTodosCallback, sybstr: string, status: string) => {
    this.setState((state) => ({
      filteredTodos: filterTodos(state.todos, sybstr, status),
    }));
  };

  render() {
    const { filteredTodos } = this.state;
    const { selectedUserId, selectUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <FilterForm handleFilterTodos={this.handleFilterTodos} />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {
              filteredTodos.map(todo => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item',
                    { 'TodoList__item--unchecked': !todo.completed },
                    { 'TodoList__item--checked': todo.completed },
                  )}
                >
                  <label htmlFor="done">
                    <input
                      id="done"
                      type="checkbox"
                      readOnly
                      checked={todo.completed}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className={classNames(
                      'TodoList__user-button',
                      { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                      'button',
                    )}
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

import classNames from 'classnames';
import React from 'react';
import { getTodos } from '../../api/api';
import './TodoList.scss';

type State = {
  todos: Todo[];
  titleSearch: string;
  statusOfTodos: string;
};

type Props = {
  selectedUserId: number;
  selectUser: (userId: number) => void;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    titleSearch: '',
    statusOfTodos: 'any',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
    });
  }

  handleChangeTodoStatus = (todoId: number) => {
    const { todos } = this.state;

    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState({
      todos: updatedTodos,
    });
  };

  handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ titleSearch: e.currentTarget.value });
  };

  handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ statusOfTodos: e.currentTarget.value });
  };

  filterTodos = (): Todo[] => {
    const { todos, statusOfTodos, titleSearch } = this.state;
    let filteredTodos;

    switch (statusOfTodos) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = [...todos];
    }

    return filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(titleSearch.toLocaleLowerCase())
    ));
  };

  render() {
    const { titleSearch, statusOfTodos } = this.state;
    const { selectedUserId, selectUser } = this.props;

    const filteredTodos = this.filterTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div>
          <label htmlFor="filter">
            Filter by title
            <input
              type="text"
              id="filter"
              value={titleSearch}
              onChange={this.handleChangeSearch}
            />
          </label>
          <select
            value={statusOfTodos}
            onChange={this.handleChangeSelect}
          >
            <option value="any">Show all</option>
            <option value="active">Show active</option>
            <option value="completed">Show completed</option>
          </select>
        </div>

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
                  <label htmlFor={String(todo.id)}>
                    <input
                      id={String(todo.id)}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => {
                        this.handleChangeTodoStatus(todo.id);
                      }}
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

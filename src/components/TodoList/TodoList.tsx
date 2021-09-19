import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { loadTodos } from '../../api';

interface Props {
  getSelectedUserId: (selectedUserId: number) => void;
  selectedUserId: number;
}

interface State {
  filteredTitle: string;
  filteredByStatus: string;
  todos: Todo[];
  visibleTodos: Todo[];
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    filteredTitle: '',
    filteredByStatus: 'all',
    todos: [],
    visibleTodos: [],
  };

  async componentDidMount() {
    const data = await loadTodos();

    this.setState({
      todos: data,
      visibleTodos: [...data],
    });
  }

  todoStatusChanger = (todoId: number) => {
    this.setState(currentState => ({
      todos: currentState.todos.map(todo => {
        if (todo.id === todoId) {
          // eslint-disable-next-line no-param-reassign
          todo.completed = !todo.completed;
        }

        return todo;
      }),
    }));
  };

  titleFilter = (filterFor: string) => {
    this.statusFilter(this.state.filteredByStatus);
    this.setState((currentState => ({
      visibleTodos: currentState.visibleTodos
        .filter(todo => todo.title.includes(filterFor)),
    })));
  };

  statusFilter = (status: string) => {
    this.setState((currentState => ({
      visibleTodos: currentState.todos
        .filter(todo => {
          switch (status) {
            case 'all':
              return todo;

            case 'active':
              return !todo.completed;

            case 'completed':
              return todo.completed;

            default:
              return todo;
          }
        }),
    })));
  };

  selectHandler = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    await this.setState({ filteredByStatus: value });

    this.statusFilter(this.state.filteredByStatus);
  };

  changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    await this.setState({ filteredTitle: value });

    this.titleFilter(this.state.filteredTitle);
  };

  render() {
    const { getSelectedUserId, selectedUserId } = this.props;
    const {
      visibleTodos,
      filteredTitle,
      filteredByStatus,
    } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <form className="field">
          <div className="control mb-3">
            <input
              name="todo-title"
              type="text"
              value={filteredTitle}
              onChange={(event) => this.changeHandler(event)}
              className="input"
            />
          </div>

          <div className="control">
            <div className="select">
              <select
                name="todo-filter"
                value={filteredByStatus}
                onChange={(event) => this.selectHandler(event)}
              >
                <option value="all">
                  All
                </option>
                <option value="active">
                  Active
                </option>
                <option value="completed">
                  Completed
                </option>
              </select>
            </div>
          </div>
        </form>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onClick={() => this.todoStatusChanger(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={`
                    TodoList__user-button
                    ${selectedUserId === todo.userId ? 'TodoList__user-button--selected' : ''}
                    button
                  `}
                  type="button"
                  onClick={() => getSelectedUserId(todo.userId)}
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

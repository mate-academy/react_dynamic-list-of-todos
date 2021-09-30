import classNames from 'classnames';
import React from 'react';
import { getTodos } from '../../api';
import { TodoFilter } from '../TodoFilter';
import { TodoRandomize } from '../TodoRandomize';
import './TodoList.scss';

interface State {
  todos: Todo[];
  query: string;
  renderStatus: Status;
}

interface Props {
  chooseUser: (userId: number) => void;
  selectedUserId: number;
}

enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
    renderStatus: Status.all,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (prevState.query !== this.state.query) {
      this.showTodosByStatus();
    }
  }

  filteredTodos = () => {
    const { query, todos } = this.state;

    return todos.filter((todo) => todo.title && todo.title.includes(query));
  };

  searchByTitle = (value: string) => {
    this.setState({ query: value });
  };

  changeShowStatus = (value: Status) => {
    this.setState({ renderStatus: value as Status });
  };

  showTodosByStatus = () => {
    const { renderStatus } = this.state;

    switch (renderStatus) {
      case Status.active:
        return this.filteredTodos().filter(todo => !todo.completed);
      case Status.completed:
        return this.filteredTodos().filter(todo => todo.completed);
      case Status.all:
      default:
        return this.filteredTodos();
    }
  };

  setShuffleTodos = (todos: Todo[]) => {
    this.setState({ todos });
  };

  async loadData() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  render() {
    const { query, renderStatus, todos } = this.state;
    const { selectedUserId } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__controls">
          <TodoFilter
            changeShowStatus={this.changeShowStatus}
            searchByTitle={this.searchByTitle}
            renderStatus={renderStatus}
            query={query}
          />

          <TodoRandomize
            setShuffleTodos={this.setShuffleTodos}
            todos={todos}
          />
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.showTodosByStatus().map(todo => (
              <li
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    {
                      'TodoList__user-button--selected': todo.userId === selectedUserId,
                    },
                  )}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    this.props.chooseUser(todo.userId);
                  }}
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

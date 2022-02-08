import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import { getTodos } from '../../api';

type Props = {
  selectUser: (userId: number) => void,
  selectedUserId: number,
};

type State = {
  query: string,
  selectValue: string,
  buttonSelected: boolean,
  todos: Todo[],
};

export class TodoList extends React.PureComponent<Props, State> {
  state: State = {
    todos: [],
    query: '',
    selectValue: '',
    buttonSelected: false,
  };

  async componentDidMount() {
    const todosFromServer = await getTodos();

    this.setState({
      todos: todosFromServer,
    });
  }

  changeTodoStatus = (todoId: number) => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    this.setState(() => ({
      todos: newTodos,
    }));
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
        return this.state.todos;
      case 'Not completed todos':
        return this.state.todos.filter(todo => todo.completed === false);
      case 'Completed todos':
        return this.state.todos.filter(todo => todo.completed === true);
      default:
        return this.state.todos;
    }
  };

  render() {
    const { selectUser, selectedUserId } = this.props;
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
          <option value="Not completed todos">Not completed todos</option>
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
                      this.changeTodoStatus(todo.id);
                    }}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected': selectedUserId === todo.userId,
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

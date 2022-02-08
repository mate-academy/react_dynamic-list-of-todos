import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { getTodos } from '../../api';

type State = {
  searchTitle: string,
  selectTodo: string,
  todos: Todo[],
};

type Props = {
  selectedUser: (userId: number) => void,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    searchTitle: '',
    selectTodo: '',
    todos: [],
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos: [...todos],
    });
  }

  handleSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTitle: event.target.value,
    });
  };

  handleSearchStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectTodo: event.target.value,
    });
  };

  getTodos = () => {
    const { searchTitle, selectTodo, todos } = this.state;

    const copyTodos = todos.filter(todo => todo.title.toLowerCase()
      .includes(searchTitle.toLowerCase()));

    if (selectTodo === 'active') {
      return copyTodos.filter(todo => !todo.completed);
    }

    if (selectTodo === 'completed') {
      return copyTodos.filter(todo => todo.completed);
    }

    return copyTodos;
  };

  changeStatus = (userId: number) => {
    const { todos } = this.state;

    const newTodoStatus = todos.map(todo => {
      if (todo.id === userId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState({
      todos: newTodoStatus,
    });
  };

  render() {
    const { searchTitle, selectTodo } = this.state;
    const { selectedUser } = this.props;

    const getSelectedTodos = this.getTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__search">
          <label htmlFor="search-query" className="label">
            Search todo
            <div className="control">
              <input
                type="text"
                id="search-query"
                className="TodoList__item"
                placeholder="Type search todo"
                value={searchTitle}
                onChange={this.handleSearchTitle}
              />
            </div>
          </label>
        </div>

        <div className="select">
          <select
            name="selectTodo"
            value={selectTodo}
            onChange={this.handleSearchStatus}
            className="TodoList__item"
          >
            <option value="all">Show all</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {getSelectedTodos.map(todo => (
              <li
                className={classNames('TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed })}
                key={todo.id}
              >
                <label htmlFor="search-query">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => this.changeStatus(todo.id)}
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => selectedUser(+todo.userId)}
                >
                  User #
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

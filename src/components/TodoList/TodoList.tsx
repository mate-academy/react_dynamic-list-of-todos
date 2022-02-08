import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';
import { getTodos } from '../../api/todos';

type Props = {
  currentUserId: number,
  selectUserId: (userId: number) => void;
};

type State = {
  todos: Todo[],
  query: string,
  selectedBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
    selectedBy: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos('/todos');

    this.setState({
      todos,
    });
  }

  changeInput = (query: string) => {
    this.setState({ query });
  };

  selectHandler = async (selectBy: string) => {
    let addUrl = '';

    switch (selectBy) {
      case 'active':
        addUrl = '/todos?completed=false';
        break;

      case 'completed':
        addUrl = '/todos?completed=true';
        break;

      default:
        addUrl = '/todos';
    }

    const todos = await getTodos(addUrl);

    this.setState({
      todos,
      selectedBy: selectBy,
    });
  };

  filterTodos = () => {
    const { query, todos } = this.state;

    if (query.length === 0) {
      return todos;
    }

    const queryToLowerCase: string = query.toLowerCase();

    return todos.filter(todo => todo.title.toLocaleLowerCase().includes(queryToLowerCase));
  };

  changeStatusTodo = (todoId: string) => {
    const todosChanged = this.state.todos.map(todo => {
      if (todo.id === todoId) {
        const currentData = Date();

        return {
          ...todo,
          completed: !todo.completed,
          updatedAt: currentData,
        };
      }

      return todo;
    });

    this.setState(() => ({
      todos: todosChanged,
    }));
  };

  buttonStyle = (todoUserId: number) => {
    const { currentUserId } = this.props;

    return classNames(
      'button',
      'TodoList__user-button',
      { 'TodoList__user-button--selected': currentUserId === todoUserId && currentUserId !== 0 },
      { 'TodoList__user-button--not-selected': currentUserId !== todoUserId && currentUserId !== 0 },
    );
  };

  render() {
    const {
      selectUserId,
      currentUserId,
    } = this.props;

    const {
      todos,
      query,
      selectedBy,
    } = this.state;

    const filteredTodos = this.filterTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div>
          <label htmlFor="search-query" className="TodoList__search-label">
            <input
              type="text"
              id="search-query"
              className={classNames(
                'TodoList__search-input',
                { 'TodoList__search-input--empty': todos.length === 0 },
              )}
              placeholder="Search todo"
              value={query}
              onChange={event => this.changeInput(event.target.value)}
            />
          </label>

          <select
            className={classNames(
              'TodoList__select',
            )}
            name="select"
            id="select"
            value={selectedBy}
            onChange={(event) => this.selectHandler(event.target.value)}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>

          <button
            type="button"
            className="button"
          >
            ramdomise
          </button>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              !todo.completed ? (
                <li
                  key={`${todo.id}--unchecked`}
                  className="TodoList__item TodoList__item--unchecked"
                >
                  <label htmlFor={`${todo.id}`}>
                    <input
                      id={todo.id}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => this.changeStatusTodo(todo.id)}
                    />
                    <p>{todo.title}</p>
                    <p>
                      Create:&nbsp;
                      {todo.createdAt}
                    </p>
                    <p>{`Status: ${todo.completed} not`}</p>
                  </label>

                  <button
                    className={this.buttonStyle(todo.userId)}
                    type="button"
                    onClick={() => currentUserId !== todo.userId && selectUserId(todo.userId)}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                </li>
              ) : (
                <li
                  key={`${todo.id}--checked`}
                  className="TodoList__item TodoList__item--checked"
                >
                  <label htmlFor={`${todo.id}`}>
                    <input
                      id={todo.id}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => this.changeStatusTodo(todo.id)}
                    />
                    <p>{todo.title}</p>
                    <p>{todo.createdAt}</p>
                    <p>
                      Done:&nbsp;
                      {todo.updatedAt}
                    </p>
                    <p>{`Status: ${todo.completed} completed`}</p>
                    <p>{currentUserId}</p>
                  </label>

                  <button
                    className={this.buttonStyle(todo.userId)}
                    type="button"
                    onClick={() => currentUserId !== todo.userId && selectUserId(todo.userId)}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

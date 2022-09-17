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
  statusTodo: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
    statusTodo: 'all',
  };

  async componentDidMount() {
    try {
      const todos: Todo[] = await getTodos();

      this.setState({
        todos,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  inputHandler = (query: string) => {
    this.setState({ query });
  };

  selectStatusTodoHandler = async (statusTodo: string) => {
    let addUrl = '';

    switch (statusTodo) {
      case 'active':
        addUrl = '?completed=false';
        break;

      case 'completed':
        addUrl = '?completed=true';
        break;

      default:
        addUrl = '';
    }

    const todos = await getTodos(addUrl);

    this.setState({
      todos,
      statusTodo,
    });
  };

  userHandler = (userId: number) => {
    if (this.props.currentUserId !== userId) {
      this.props.selectUserId(userId);
    }
  };

  filterTodos = () => {
    const { query, todos } = this.state;

    if (query.length === 0) {
      return todos;
    }

    const queryToLowerCase: string = query.toLowerCase();

    return todos.filter(todo => todo.title.toLocaleLowerCase().includes(queryToLowerCase));
  };

  randomize = (array: Todo[]) => {
    const randomArray = array;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < randomArray.length; i++) {
      const random = Math.floor(Math.random() * randomArray.length);

      // eslint-disable-next-line no-param-reassign
      [randomArray[i], randomArray[random]] = [randomArray[random], randomArray[i]];
    }

    this.setState({
      todos: randomArray,
    });
  };

  changeStatusTodo = (todoId: string) => {
    const todosChanged = this.state.todos.map(todo => {
      if (todo.id === todoId) {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentData = `${day}/${month}/${year}`;

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
      todos,
      query,
      statusTodo,
    } = this.state;

    const filteredTodos = this.filterTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__header">
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
              onChange={event => this.inputHandler(event.target.value)}
            />
          </label>

          <select
            className="TodoList__select"
            name="select"
            id="select"
            value={statusTodo}
            onChange={(event) => this.selectStatusTodoHandler(event.target.value)}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>

          <button
            type="button"
            className="button TodoList__button"
            onClick={() => this.randomize(this.state.todos)}
          >
            ramdomise
          </button>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={`${todo.id}--unchecked`}
                className={classNames('TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed })}
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
                  onClick={() => this.userHandler(todo.userId)}
                >
                  UserID&nbsp;
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

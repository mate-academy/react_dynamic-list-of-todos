import React from 'react';
import { getTodos } from '../../API/API';
import './TodoList.scss';

type Props = {
  selectedUser:(userId: number) => void;
};

type State = {
  todos: Todo[],
  query: string,
  selectedTitle: string
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
    selectedTitle: '',
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos });
      });
  }

  todosFilter = (): Todo[] => {
    const { query, todos } = this.state;

    const filteredTodos = todos.filter(
      todo => (todo.title.toLowerCase().includes(query.toLowerCase())),
    );

    return filteredTodos;
  };

  filteredSelections = () => {
    const { selectedTitle } = this.state;

    if (selectedTitle === 'active') {
      return (
        this.todosFilter().filter(todo => (
          todo.completed !== true
        ))
      );
    }

    if (selectedTitle === 'completed') {
      return (
        this.todosFilter().filter(todo => (
          todo.completed === true
        ))
      );
    }

    return this.todosFilter();
  };

  render() {
    const { query, selectedTitle } = this.state;
    const filteredTodos = this.filteredSelections();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          placeholder="Search"
          className="App__user-selector"
          type="text"
          value={query}
          onChange={event => {
            this.setState({
              query: event.target.value,
            });
          }}
        />

        <select
          className="App__user-selector"
          value={selectedTitle}
          onChange={event => {
            this.setState({
              selectedTitle: event.target.value,
            });
          }}
        >
          <option value="all">All tasks</option>
          <option value="active">In progres</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={todo.completed
                  ? 'TodoList__item TodoList__item--checked'
                  : 'TodoList__item TodoList__item--unchecked'}
              >
                <label htmlFor="input-checkbox">
                  <input
                    type="checkbox"
                    id="input-checkbox"
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button"
                  type="button"
                  onClick={() => this.props.selectedUser(todo.userId)}
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

export default TodoList;

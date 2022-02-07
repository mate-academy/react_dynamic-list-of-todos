import React from 'react';
import './TodoList.scss';
import 'bulma';

type Props = {
  handleUserIdChange: (todo: Todo) => void;
  todos: Todo[],
};

type State = {
  query: string;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    query: '',
  };

  handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value,
    });
  };

  getVisibleTodos = () => {
    const searchQuery = this.state.query.toLowerCase();

    return this.props.todos.filter(todo => todo.title.toLowerCase().includes(searchQuery));
  };

  render() {
    const { handleUserIdChange } = this.props;
    const filteredTodos = this.getVisibleTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="box">
          <div className="field">
            <label htmlFor="search-query" className="label">
              Search Todo
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={this.state.query}
                onChange={this.handleTodoChange}
              />
            </label>
          </div>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li className="TodoList__item TodoList__item--unchecked" key={todo.id}>
                <label htmlFor="checkbox">
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    button
                    TodoList__user-button
                    TodoList__user-button--selected
                  "
                  type="button"
                  key={todo.id}
                  onClick={() => handleUserIdChange(todo)}
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

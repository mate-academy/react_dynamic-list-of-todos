import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUser: (userId: number) => void,
};

type State = {
  newTitle: string,
  status: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    newTitle: '',
    status: 'all',
  };

  handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
    });
  };

  getVisibleTodos = (): Todo[] => {
    const visibleTodos = this.props.todos
      .filter(todo => todo.title.includes(this.state.newTitle));

    if (this.state.status === 'active') {
      return visibleTodos.filter(todo => !todo.completed);
    }

    if (this.state.status === 'completed') {
      return visibleTodos.filter(todo => todo.completed);
    }

    return visibleTodos;
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      status: event.target.value,
    });
  };

  render() {
    const { selectUser } = this.props;
    const { newTitle, status } = this.state;
    const filteredTodos = this.getVisibleTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={newTitle}
          onChange={this.handleSearchInput}
        />

        <select
          value={status}
          onChange={this.handleSelectChange}
        >
          <option value="all">Show all</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className="TodoList__list-item"
              >
                <label htmlFor="todo">
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    id="todo"
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  type="button"
                  onClick={() => selectUser(todo.userId)}
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

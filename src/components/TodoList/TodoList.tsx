import * as React from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  selectUser: (id: number) => void;
}

type State = {
  filterType: string;
  serchInput: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    filterType: '',
    serchInput: '',
  };

  render() {
    let { todos } = this.props;
    const { selectUser } = this.props;
    const { filterType, serchInput } = this.state;

    switch (filterType) {
      case 'completed':
        todos = todos.filter(todo => todo.completed);
        break;
      case 'not completed':
        todos = todos.filter(todo => !todo.completed);
        break;
      default:
        break;
    }

    if (serchInput.length !== 0) {
      todos = [...todos].filter(todo => todo.title.includes(serchInput));
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <select
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => (
            this.setState({ filterType: event.target.value }))}
          value={this.state.filterType}
        >
          <option value="">
            select filter type
          </option>
          <option
            value="completed"
          >
            completed
          </option>
          <option
            value="not completed"
          >
            not completed
          </option>
        </select>

        <input
          type="text"
          value={serchInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => (
            this.setState({ serchInput: event.target.value })
          )}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'TodoList__item TodoList__item--checked' : 'TodoList__item TodoList__item--unchecked'}>
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  User&nbsp;#
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

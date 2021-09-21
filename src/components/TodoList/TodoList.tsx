import React from 'react';
import classNames from 'classnames';
import { TodoForm } from '../TodoForm';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  onUsersId: (userId: number) => void;
};

type State = {
  filteredQuery: string,
  selectedQuery: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    filteredQuery: '',
    selectedQuery: '',
  };

  handleChange = (event: InputOrSelect) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  getFilteredTodos = () => {
    const { todos } = this.props;
    const query = this.state.filteredQuery.toLowerCase();
    const filteredTodos = todos
      .filter(todo => todo.title.toLowerCase().includes(query));

    switch (this.state.selectedQuery) {
      case 'all':
        return filteredTodos;

      case 'active':
        return filteredTodos
          .filter(todo => !todo.completed);

      case 'completed':
        return filteredTodos
          .filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  };

  render() {
    const { filteredQuery, selectedQuery } = this.state;
    const { onUsersId } = this.props;
    const filtredTodos = this.getFilteredTodos();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <TodoForm
          onHandleChange={this.handleChange}
          filteredQuery={filteredQuery}
          selectedQuery={selectedQuery}
        />

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filtredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
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
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => onUsersId(todo.userId)}
                >
                  {`User:${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

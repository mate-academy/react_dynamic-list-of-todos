import React from 'react';
import './TodoList.scss';

interface State {
  searchInput: string;
  currentOption: string;
}

interface Props {
  todos: Todo[];
  setUser: (id: number) => Promise<void>;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    searchInput: '',
    currentOption: 'all',
  };

  leftVisible = (todo: Todo): boolean => {
    const { searchInput, currentOption } = this.state;
    const { title, completed } = todo;
    const searched: boolean = title.toLowerCase().includes(searchInput.toLowerCase());

    if (!searched) {
      return false;
    }

    if (currentOption === 'all') {
      return true;
    }

    const isComplited = completed && currentOption === 'completed';
    const isActive = !completed && currentOption === 'active';

    return isComplited || isActive;
  };

  handleChange = (key: string, value: string) => {
    this.setState({
      [key]: value,
    } as Pick<State, keyof State>);
  };

  render() {
    const { searchInput } = this.state;
    const { todos, setUser } = this.props;

    const shownTodos = todos.filter(this.leftVisible);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={searchInput}
          onChange={(e) => this.handleChange('searchInput', e.target.value)}
        />

        <select onChange={(e) => this.handleChange('currentOption', e.currentTarget.value)}>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {shownTodos.map(todo => (
              <li
                key={todo.id}
                className={
                  `
                   TodoList__item 
                   TodoList__item--${todo.completed ? '' : 'un'}checked
                  `
                }
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
                  className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button"
                  type="button"
                  onClick={() => setUser(todo.userId)}
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

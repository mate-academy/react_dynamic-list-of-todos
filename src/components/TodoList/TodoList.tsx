import React from 'react';
import './TodoList.scss';

interface State {
  searchField: string;
  selectOption: string;
}

interface Props {
  todos: Todo[];
  setUser: (id: number) => Promise<void>;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    searchField: '',
    selectOption: 'all',
  };

  isVisible = (todo: Todo): boolean => {
    const { searchField, selectOption } = this.state;
    const { title, completed } = todo;
    const search: boolean = title.toLowerCase().includes(searchField.toLowerCase());

    if (!search) {
      return false;
    }

    if (selectOption === 'all') {
      return true;
    }

    const isDone = completed && selectOption === 'done';
    const isActive = !completed && selectOption === 'active';

    return isDone || isActive;
  };

  handleChange = (key: string, value: string) => {
    this.setState({
      [key]: value,
    } as Pick<State, keyof State>);
  };

  render() {
    const { searchField } = this.state;
    const { todos, setUser } = this.props;

    const visibleTodos = todos.filter(this.isVisible);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          value={searchField}
          placeholder="Input the text..."
          onChange={event => this.handleChange('searchField', event.target.value)}
        />

        <select onChange={event => this.handleChange('selectOption', event.currentTarget.value)}>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="done">done</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={
                  `
                   TodoList__item 
                   TodoList__item--${todo.completed ? '' : 'un'}checked
                  `
                }
              >
                <label htmlFor="input">
                  <input
                    type="checkbox"
                    id="input"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="button"
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

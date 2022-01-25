import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectUser: (id: number) => void;
  selectedUserId: number;
};

type State = {
  search: string,
  filterBy: string,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    search: '',
    filterBy: 'all',
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  getFilter = () => {
    const { todos } = this.props;
    const { search, filterBy } = this.state;

    const filterByComplete = todos.filter(({ completed }) => {
      if (filterBy === 'active') {
        return !completed;
      }

      if (filterBy === 'completed') {
        return completed;
      }

      return true;
    });

    return filterByComplete.filter(({ title }) => {
      return title.toLowerCase().includes(search.toLowerCase());
    });
  };

  render() {
    const { selectedUserId } = this.props;
    const { search } = this.state;
    const todos = this.getFilter();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="filter">
          <label htmlFor="search">
            Search&nbsp;
            <input
              type="text"
              value={search}
              name="search"
              onChange={this.changeHandler}
            />
          </label>

          <select name="filterBy" onChange={this.changeHandler}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <li
                key={todo.id}
                className={`TodoList__item ${todo.completed
                  ? 'TodoList__item--checked'
                  : 'TodoList__item--unchecked'}`}
              >
                <label htmlFor="check">
                  <input
                    type="checkbox"
                    id="check"
                    checked={todo.completed}
                    readOnly
                  />

                  <p>{todo.title}</p>
                </label>

                <button
                  className={
                    `TodoList__user-button button ${selectedUserId === todo.userId
                      ? 'TodoList__user-button--selected'
                      : ''
                    }`
                  }
                  type="button"
                  onClick={() => this.props.selectUser(todo.userId)}
                >
                  {`User ${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

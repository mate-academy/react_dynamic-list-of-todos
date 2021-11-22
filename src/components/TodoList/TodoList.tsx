import React, { ChangeEvent } from 'react';
import './TodoList.scss';
import classNames from 'classnames';

interface State {
  findTitle: string;
  filterBy: string;
}

interface Props {
  todos: Todo[]
  onFind:(userId:number) => void
}

export class TodoList extends React.Component<Props, State> {
  state = {
    findTitle: '',
    filterBy: 'All',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      findTitle: value,
    });
  };

  filterTodo = () => {
    const { findTitle, filterBy } = this.state;
    const { todos } = this.props;

    const newTodos = todos.filter(todo => {
      switch (filterBy) {
        case 'All':
          return (todo.title.toLocaleLowerCase()).includes(findTitle.toLowerCase());
        case 'Active':
          return (todo.completed);
        case 'Completed':
          return (!todo.completed);
        default:
          return (todo.title.toLocaleLowerCase()).includes(findTitle.toLowerCase());
      }
    });

    return newTodos;
  };

  render() {
    const { findTitle } = this.state;
    const { todos, onFind } = this.props;

    const newTodos = this.filterTodo();

    // eslint-disable-next-line no-console
    console.log('Todos', todos);

    return (
      <>
        <div className="TodoList">
          <h2>Todos:</h2>
          Search Todo:
          {' '}
          <form action="">
            <input
              value={findTitle}
              type="text"
              onChange={(event) => {
                this.handleChange(event);
              }}
            />

            <select
              name="filterTodos"
              onChange={(event) => {
                const { value } = event.target;

                this.filterTodo();
                this.setState({ filterBy: value });
              }}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </form>
          { newTodos.map((todo:Todo) => (
            <div key={todo.id} className="TodoList__list-container">
              <ul className="TodoList__list">
                <li
                  className={classNames(
                    'TodoList__item',
                    {
                      'TodoList__item--unchecked': !todo.completed,
                      'TodoList__item--checked': todo.completed,
                    },
                  )}
                >
                  <label htmlFor="123123">
                    <input id="123123" type="checkbox" readOnly />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
                    type="button"
                    value=""
                    onClick={() => onFind(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </>
    );
  }
}

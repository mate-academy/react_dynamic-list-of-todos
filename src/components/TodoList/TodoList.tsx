/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';

type Props = {
  todos: Todo[];
  click: (id: number) => void;
  selectedId: number;
};

type State = {
  search: string,
  filter: string,
};

class TodoList extends React.Component<Props, State> {
  state = {
    search: '',
    filter: 'all',
  };

  render() {
    const { todos, selectedId, click } = this.props;

    let preparedTodos = todos.filter(todo => todo.title.includes(this.state.search));

    if (this.state.filter !== 'all') {
      if (this.state.filter === 'completed') {
        preparedTodos = preparedTodos.filter(todo => todo.completed);
      } else {
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
      }
    }

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <form className="TodoList__list_form">
            <div className="TodoList__list_form-search">
              <label htmlFor="search">Search by title:</label>
              <input type="text" name="search" id="search" onChange={(event) => this.setState({ search: event.target.value })} />
            </div>
            <div className="TodoList__list_form-search">
              <label htmlFor="status">Filter:</label>
              <select name="status" id="status" style={{ width: '250px' }} onChange={(event) => this.setState({ filter: event.target.value })}>
                <option value="all">All</option>
                <option value="active">Not completed</option>
                <option value="completed">completed</option>
              </select>
            </div>
          </form>
          <ul className="TodoList__list">
            {preparedTodos.map((todo) => (
              <li key={todo.id} className={classnames('TodoList__item', todo.completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked')}>
                <label>
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classnames('button', 'TodoList__user-button', todo.userId === selectedId ? 'TodoList__user-button--selected' : '')}
                  type="button"
                  onClick={() => click(todo.userId)}
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

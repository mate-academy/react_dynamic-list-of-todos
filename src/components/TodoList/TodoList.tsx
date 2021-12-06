import React, { ChangeEvent } from 'react';
import './TodoList.scss';
import classnames from 'classnames';

interface State {
  todosForDisplay: Todo[]
}

type Props = {
  todos: Todo[];
  selectedUser: number;
  onSelectUser: (userId: number) => void;
};

class TodoList extends React.Component<Props, State> {
  state = {
    todosForDisplay: this.props.todos,
  };

  statusList: string[] = ['all', 'active', 'completed'];

  randomizeOrder = () => {
    this.setState({
      todosForDisplay: this.props.todos
        .sort(() => 0.5 - Math.random()),
    });
  };

  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'title') {
      this.setState({
        todosForDisplay: this.props.todos
          .filter(todo => todo.title.toLowerCase().includes(value.toLowerCase())),
      });
    } else {
      this.setState({
        todosForDisplay: this.props.todos
          .filter(todo => {
            switch (value) {
              case 'all':
                return todo.title;

              case 'active':
                return !todo.completed;

              default:
                return todo.completed;
            }
          }),
      });
    }
  };

  render() {
    const { onSelectUser, selectedUser } = this.props;
    const { todosForDisplay } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__filter-container">
          <label htmlFor="title">
            Filter by title:
            <input
              className="TodoList__filter"
              type="text"
              name="title"
              onChange={this.handleChange}
              placeholder="Enter the title for filtering"
            />
          </label>
          <label htmlFor="status">
            Filter by status:
            <select
              className="TodoList__filter"
              name="status"
              onChange={this.handleChange}
            >
              {this.statusList.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>
          <button onClick={this.randomizeOrder} type="button">Randomize order</button>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todosForDisplay.map((todo: Todo) => (
              <li
                key={todo.id}
                className={classnames('TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                })}
              >
                <label htmlFor="readonly">
                  <input id="readonly" type="checkbox" readOnly checked={todo.completed} />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classnames('TodoList__user-button', 'button', {
                    'TodoList__user-button--selected': todo.userId === selectedUser,
                  })}
                  type="button"
                  onClick={() => onSelectUser(todo.userId)}
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

import React from 'react';
import './TodoList.scss';
import { Todo } from '../../types/types';

interface Props {
  todos: Todo[],
  onSelectUser: (userId: number) => void,
}

export class TodoList extends React.Component<Props, {}> {
  state = {
    todos: this.props.todos,
  };

  filterTodos = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'title') {
      this.setState({
        todos: this.props.todos
          .filter(todo => todo.title.toLocaleUpperCase()
            .includes(value.toLocaleUpperCase())),
      });
    }

    if (name === 'status') {
      this.setState({
        todos: this.props.todos
          .filter(todo => {
            switch (value) {
              case 'active':
                return !todo.completed;
                break;

              case 'completed':
                return todo.completed;
                break;

              default:
                return todo.title;
                break;
            }
          }),
      });
    }
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="TodoList">
        <button
          type="button"
          className="TodoList__Refresh"
          onClick={() => window.location.reload()}
        >
          &#10227;
        </button>

        <h2>Todos:</h2>
        <div className="TodoList__Filters">
          <input
            type="text"
            className="TodoList__Filters--title"
            name="title"
            placeholder="Enter Title Here"
            onChange={this.filterTodos}
          />
          <select
            className="TodoList__Filters--status"
            name="status"
            onChange={this.filterTodos}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => {
              return (
                !todo.completed ? (
                  <li
                    key={todo.id}
                    className="TodoList__item TodoList__item--unchecked"
                  >
                    <label htmlFor="active">
                      <input
                        type="checkbox"
                        name="active"
                        readOnly
                      />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className="
                        TodoList__user-button
                        TodoList__user-button--selected
                        button
                      "
                      type="button"
                      onClick={() => this.props.onSelectUser(todo.userId)}
                    >
                      {`User #${todo.userId}`}
                    </button>
                  </li>
                ) : (
                  <li
                    key={todo.id}
                    className="TodoList__item
                      TodoList__item--checked
                    "
                  >
                    <label htmlFor="completed">
                      <input
                        type="checkbox"
                        className="completed"
                        checked
                        readOnly
                      />
                      <p>{todo.title}</p>
                    </label>

                    <button
                      className="TodoList__user-button button"
                      type="button"
                      onClick={() => this.props.onSelectUser(todo.userId)}
                    >
                      {`User #${todo.userId}`}
                    </button>
                  </li>
                )
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          className="TodoList__Return_To_Top"
          onClick={() => {
            document.documentElement.scrollTop = 0;
          }}
        >
          &#65514;
        </button>
      </div>
    );
  }
}

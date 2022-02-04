import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
  selectUserId: (id: number) => void,
  enableRandom: () => void,
};

type State = {
  title: string,
  completed: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    completed: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  adjustContent = (todos: Todo[]) => {
    const { title, completed } = this.state;

    const newTodos = [...todos]
      .filter(todo => todo.title.includes(title))
      .filter(todo => {
        if (completed !== '') {
          return `${todo.completed}` === completed;
        }

        return true;
      });

    return newTodos;
  };

  render() {
    const { title, completed } = this.state;
    const { todos, selectUserId, enableRandom } = this.props;

    return (
      <div className="TodoList">
        <h2 className="TodoList__title">
          Todos:
          <input
            name="title"
            type="text"
            value={title}
            onChange={this.handleChange}
          />
        </h2>

        <select
          name="completed"
          value={completed}
          onChange={this.handleChange}
        >
          <option value="">all</option>
          <option value="false">active</option>
          <option value="true">completed</option>
        </select>

        <button
          type="button"
          onClick={enableRandom}
        >
          Randomize
        </button>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {this.adjustContent(todos).map(todo => (
              <li
                className="TodoList__item TodoList__item--checked"
                key={todo.id}
              >
                <p>
                  {todo.title}
                  {`. completed: ${todo.completed}`}
                </p>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => selectUserId(+todo.userId)}
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

import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  onUserSelection: (userId: number) => void;
}

interface State {
  title: string;
  activities: string;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    activities: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ title: value });
  };

  filterByTitle = () => {
    const { title } = this.state;
    const { todos } = this.props;

    const lowerTitle = title.toLowerCase();

    return todos.filter(item => (
      item.title.includes(lowerTitle)
    ));
  };

  selectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({ activities: value });
  };

  filterBySelect = () => {
    const { activities } = this.state;

    if (activities === 'active') {
      return (
        this.filterByTitle().filter(complite => (
          complite.completed !== true
        ))
      );
    }

    if (activities === 'completed') {
      return (
        this.filterByTitle().filter(complite => (
          complite.completed === true
        ))
      );
    }

    return (
      this.filterByTitle()
    );
  };

  render() {
    const { onUserSelection } = this.props;

    const filteredTodos = this.filterBySelect();

    // eslint-disable-next-line no-console
    console.log(this.state.activities);

    return (
      <div className="TodoList" onChange={this.filterByTitle}>
        <h2>Todos:</h2>

        <input
          type="text"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <select
          name="activities"
          value={this.state.activities}
          onChange={this.selectOption}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames('TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  })}
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
                    button
                  "
                  type="button"
                  onClick={() => onUserSelection(todo.userId)}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ))}

            <li className="TodoList__item TodoList__item--checked">
              <label>
                <input type="checkbox" checked readOnly />
                <p>distinctio vitae autem nihil ut molestias quo</p>
              </label>

              <button
                className="TodoList__user-button button"
                type="button"
              >
                User&nbsp;#2
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

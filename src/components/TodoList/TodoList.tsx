/* eslint-disable no-param-reassign */ // for 46 and 47 lines
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  selectUser: (id: number) => void;
};

type State = {
  todos: Todo[];
  searchQuery: string;
  todoStatus: string;
  randomOrder: boolean;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    todos: this.props.todos,
    searchQuery: '',
    todoStatus: 'all',
    randomOrder: false,
  };

  changeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: target.value });
  };

  onStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ todoStatus: event.target.value });
  };

  onRandom = () => {
    this.setState(state => ({
      randomOrder: !state.randomOrder,
    }));
  };

  shuffleTodos = (todos: Todo[]) => {
    for (let i = todos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = todos[i];

      todos[i] = todos[j];
      todos[j] = temp;
    }

    return todos;
  };

  render() {
    const {
      todos,
      searchQuery,
      todoStatus,
      randomOrder,
    } = this.state;
    const { selectUser } = this.props;

    let visibleTodos = [...todos];

    switch (todoStatus) {
      case 'all':
        break;

      case 'active':
        visibleTodos = visibleTodos.filter(todo => !todo.completed);
        break;

      case 'completed':
        visibleTodos = visibleTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    visibleTodos = visibleTodos.filter(todo => {
      const lowCaseQuery = searchQuery.toLowerCase();
      const lowCaseTitle = todo.title.toLowerCase();

      return lowCaseTitle.includes(lowCaseQuery);
    });

    if (randomOrder) {
      visibleTodos = this.shuffleTodos(visibleTodos);
    }

    return (
      <div className="TodoList content">
        <h2>Todos:</h2>

        <div className="TodoList__list-container content">
          <div className="TodoList__input-wrapper">
            <input
              onChange={this.changeHandler}
              value={searchQuery}
              className="input is-normal"
              type="text"
              placeholder="Search..."
            />
          </div>

          <div className="select">
            <select onChange={this.onStatusSelect}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            onClick={this.onRandom}
            type="button"
            className="button is-primary"
          >
            Randomize
          </button>

          <ul className="TodoList__list">
            {visibleTodos.map(todo => (
              <li
                className={classNames('TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
                key={todo.id}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                  type="button"
                  onClick={() => selectUser(todo.userId)}
                >
                  User #
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

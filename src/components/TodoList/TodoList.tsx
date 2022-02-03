import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectUser: (id: number) => void;
};

type State = {
  input: string;
  option: string;
};

export class TodoList extends React.Component<Props, State> {
  state = {
    input: '',
    option: 'all',
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: event.target.value,
    });
  };

  selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      option: event.currentTarget.value,
    });
  };

  filterTodos = () => {
    const { todos } = this.props;
    const { input, option } = this.state;
    let filteredTodos;

    switch (option) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = [...todos];
    }

    return filteredTodos.filter(({ title }) => (
      title.includes(input)
    ));
  };

  findCompleted = () => {
    const { todos } = this.props;

    return todos.filter(({ completed }) => (
      completed
    ));
  };

  render() {
    const { selectUser } = this.props;
    const { input, option } = this.state;

    const filteredTodos = this.filterTodos();

    // eslint-disable-next-line no-console
    console.log(filteredTodos);

    return (
      <>
        <form action="get">
          <input
            type="text"
            placeholder="Enter a title"
            value={input}
            onChange={this.changeHandler}
          />
          <select
            value={option}
            onChange={this.selectHandler}
          >
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </select>
        </form>
        <div className="TodoList">
          <h2>Todos:</h2>

          <div className="TodoList__list-container">
            <ul className="TodoList__list">
              {filteredTodos.map((todo: Todo) => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item',
                    {
                      'TodoList__item--checked': todo.completed,
                      'TodoList__item--unchecked': !todo.completed,
                    },
                  )}
                >
                  <label htmlFor="todo">
                    {todo.completed
                      ? (
                        <input type="checkbox" checked readOnly />
                      ) : (
                        <input type="checkbox" readOnly />
                      )}
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className="button TodoList__user-button"
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User\xa0#${todo.userId}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { Todo } from '../../react-app-env';
import { requestTodoList } from '../../api';

type Props = {
  selectedUserId: number,
  onChangeUser: (userId:number) => void,
};

interface State {
  todos: Todo[],
  selected: string,
  input: string,
}

export class TodoList extends React.Component<Props, State> {
  state:State = {
    todos: [],
    selected: 'all',
    input: '',
  };

  async componentDidMount() {
    const loadedTodos = await requestTodoList();

    this.setState({
      todos: loadedTodos,
    });
  }

  selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      selected: value,
    });
  };

  inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: event.target.value,
    });
  };

  render() {
    const { todos, selected, input } = this.state;
    const { selectedUserId } = this.props;
    const selectedTodos = todos.filter(todo => {
      if (input.length > 0 && selected === 'all') {
        // eslint-disable-next-line max-len
        return todo.title.toLowerCase().includes(this.state.input.toLowerCase());
      }

      if (input.length > 0 && selected === 'completed') {
        // eslint-disable-next-line max-len
        return (todo.title.toLowerCase().includes(this.state.input.toLowerCase()) && todo.completed);
      }

      if (input.length > 0 && selected === 'active') {
        // eslint-disable-next-line max-len
        return (todo.title.toLowerCase().includes(this.state.input.toLowerCase()) && !todo.completed);
      }

      if (selected === 'completed') {
        return todo.completed;
      }

      if (selected === 'active') {
        return !todo.completed;
      }

      return todo;
    });

    return (
      <div className="TodoList">
        <input
          type="text"
          onChange={this.inputHandler}
        />
        <select
          name="select"
          onChange={this.selectHandler}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {selectedTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item', {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  },
                )}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>
                  {todo.title}
                </p>
                <button
                  type="button"
                  className={classNames('TodoList__user-button button', {
                    'TodoList__item--checked': todo.userId === selectedUserId,
                  })}
                  onClick={() => this.props.onChangeUser(todo.userId)}
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

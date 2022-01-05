import React from 'react';
import './TodoList.scss';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selectUser: (selectedUserId:number, todoId:number) => void;
  todoId: number;
};

type State = {
  title: string;
  todoList: Todo[];
  todosStatus: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    todoList: [],
    todosStatus: '',
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.todoList !== nextProps.todos) {
      return {
        todoList: nextProps.todos,
      };
    }

    return null;
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  filterTodosByTitle = () => {
    const { title, todosStatus } = this.state;
    const filteredByStatusTodos = this.filterTodosByStatus(todosStatus);

    return (
      filteredByStatusTodos.filter(todo => (
        todo.title.toLowerCase().includes(title.toLowerCase())
      ))
    );
  };

  filterTodosByStatus = (value: string) => {
    const { todoList } = this.state;

    switch (value) {
      case 'active':
        return todoList.filter(todo => !todo.completed);
      case 'completed':
        return todoList.filter(todo => todo.completed);
      default:
        return todoList;
    }
  };

  handleChangeTodos = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    return this.setState({
      todosStatus: value,
    });
  };

  changeTodosOrder = () => {
    this.setState((state) => ({
      todoList: state.todoList.sort(() => Math.random() - 0.5),
    }));
  };

  render() {
    const { title, todosStatus } = this.state;
    const { todoId, selectUser } = this.props;
    const filterTodos: Todo[] = this.filterTodosByTitle();

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="TodoList__status status">
          <input
            type="text"
            placeholder="Filter the todos by title"
            value={title}
            onChange={this.handleChange}
            className="status__item"
          />
          <select
            name="todos"
            value={todosStatus}
            onChange={this.handleChangeTodos}
            className="status__item"
          >
            <option value="" disabled>Select todos</option>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="button"
            onClick={this.changeTodosOrder}
            className="status__item status__button"
          >
            Randomize
          </button>
        </div>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filterTodos.map(todo => (
              <li
                key={todo.id}
                className={classnames(
                  'TodoList__item', 'TodoList__item--checked', {
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
              >
                <label htmlFor="one">
                  <input type="checkbox" readOnly checked={todo.completed} />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classnames(
                    'TodoList__user-button', 'button', {
                      'TodoList__user-button--selected': todoId === todo.id,
                    },
                  )}
                  type="button"
                  onClick={() => selectUser(todo.userId, todo.id)}
                >
                  {`User #${todo.id}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

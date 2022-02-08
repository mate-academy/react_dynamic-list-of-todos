import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { getAllTodos, getSelectTodos, updateCheckTodo } from '../../api/api';

type Props = {
  selectedUserId: number;
  setSelectedId: (id: number) => void;
};

type State = {
  todos: Todo[];
  inputFilterValue: string;
  selectFilterValue: string;
  visibleTodos: Todo[];
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    inputFilterValue: '',
    selectFilterValue: 'all',
    visibleTodos: [],
  };

  componentDidMount() {
    this.loadAllTodos();
  }

  componentDidUpdate(_: any, prevState: State) {
    if (this.state.inputFilterValue !== prevState.inputFilterValue
      || this.state.todos !== prevState.todos) {
      this.filterTodos();
    }
  }

  randomSortTodos = () => {
    const random = Number((Math.random() * 20).toFixed(0));

    this.setState(state => ({
      visibleTodos: [...state.visibleTodos].sort((a, b) => {
        if (a.title[random] && b.title[random]) {
          return a.title[random].localeCompare(b.title[random]);
        }

        return -1;
      }),
    }));
  };

  loadAllTodos = async () => {
    const todos = await getAllTodos();

    this.setState({
      todos: [...todos],
      visibleTodos: [...todos],
    });
  };

  selectUsersbyId = (id: number) => {
    if (id !== this.props.selectedUserId) {
      this.props.setSelectedId(id);
    }
  };

  setCheckTodo = async (id: number, isChecked: boolean) => {
    await updateCheckTodo(id, isChecked);
    this.updateTodos(this.state.selectFilterValue);
  };

  loadCheckTodo = async (isChecked: boolean) => {
    getSelectTodos(isChecked)
      .then(todos => {
        this.setState({
          todos: [...todos],
          visibleTodos: [...todos],
        });
      });
  };

  updateTodos = (value: string) => {
    switch (value) {
      case 'active':
        this.loadCheckTodo(false);
        break;
      case 'completed':
        this.loadCheckTodo(true);
        break;
      default:
        this.loadAllTodos();
    }
  };

  filterTodos = () => {
    this.setState(state => ({
      visibleTodos: state.todos.filter(todo => (todo.title.includes(state.inputFilterValue))),
    }));
  };

  hendlerFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      inputFilterValue: value,
    });
  };

  hendlerFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.updateTodos(value);

    this.setState({
      selectFilterValue: value,
    });
  };

  render() {
    const {
      selectedUserId,
    } = this.props;

    const {
      inputFilterValue,
      selectFilterValue,
      visibleTodos,
    } = this.state;

    return (
      <div className="TodoList">

        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            name="titleFilter"
            className="input"
            placeholder="Search todo"
            value={inputFilterValue}
            onChange={this.hendlerFilterInput}
          />
          <select
            name="selectTodos"
            defaultValue={selectFilterValue}
            className="select"
            onChange={this.hendlerFilterSelect}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">completed</option>
          </select>

          <button
            type="button"
            className="button is-primary is-light"
            onClick={this.randomSortTodos}
          >
            Randomize
          </button>

          <ul className="TodoList__list">
            {
              visibleTodos.map(todo => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item',
                    { 'TodoList__item--unchecked': !todo.completed },
                    { 'TodoList__item--checked': todo.completed },
                  )}
                >
                  <label htmlFor={`${todo.id}`}>
                    <input
                      type="checkbox"
                      id={`${todo.id}`}
                      checked={todo.completed}
                      onChange={() => (this.setCheckTodo(todo.id, todo.completed))}
                    />
                    <p>
                      {todo.title}
                    </p>
                  </label>

                  <button
                    className={classNames(
                      'TodoList__user-button',
                      'button',
                      { 'TodoList__user-button--selected': (todo.userId === selectedUserId) },
                    )}
                    type="button"
                    onClick={() => (this.selectUsersbyId(todo.userId))}
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

import React from 'react';
import './TodoList.scss';
import cn from 'classnames';
import { TodoType } from './TodoType';

interface State {
  fetchedTodos: TodoType[];
  todos: TodoType[];
  failedtoLoad: boolean;
  loadingTodos: boolean;
}

interface Props {
  selectUser: (userId: number) => void;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    fetchedTodos: [],
    todos: [],
    failedtoLoad: false,
    loadingTodos: true,
  };

  componentDidMount() {
    try {
      this.request();
    } catch (error) {
      this.setState({ failedtoLoad: true });
    }
  }

  shuffleArray = () => {
    this.setState((prev) => {
      const newArr = prev.todos.sort(() => 0.5 - Math.random());

      return { todos: newArr };
    });
  };

  request = async () => {
    const todosResponse = await fetch('https://mate.academy/students-api/todos');

    const todosArray: TodoType[] = await todosResponse.json();

    this.setState({ todos: todosArray, fetchedTodos: todosArray, loadingTodos: false });
  };

  render() {
    const {
      todos,
      fetchedTodos,
      loadingTodos,
      failedtoLoad,
    } = this.state;
    const { selectUser } = this.props;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <h3
          hidden={!loadingTodos}
        >
          Loading todos...
        </h3>
        <h3
          hidden={!failedtoLoad}
        >
          Failed to load todos
        </h3>
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            if (event.target.value.length === 0) {
              this.setState({ todos: fetchedTodos });
            } else {
              this.setState((prev) => {
                return {
                  todos: prev.todos.filter(el => el.title.toLowerCase()
                    .includes(event.target.value.toLocaleLowerCase())),
                };
              });
            }
          }}
        />
        <button
          type="button"
          onClick={() => this.shuffleArray()}
        >
          Randomize
        </button>
        <select name="sorting__selection" id="sorting__selection">
          <option
            value="completed"
            onClick={() => this.setState({ todos: [...fetchedTodos] })}
          >
            All
          </option>
          <option
            value="completed"
            onClick={() => this.setState({
              todos: fetchedTodos.filter(el => el.completed === true),
            })}
          >
            Completed
          </option>
          <option
            value="completed"
            onClick={() => this.setState({
              todos: fetchedTodos.filter(el => el.completed === false),
            })}
          >
            Active
          </option>
        </select>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos && todos.map(todo => {
              return (
                <li
                  key={todo.id}
                  className={
                    cn('TodoList__item', {
                      'TodoList__item--checked': todo.completed,
                      'TodoList__item--unchecked': !todo.completed,
                    })
                  }
                >
                  <label>
                    <input type="checkbox" readOnly />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    onClick={() => {
                      selectUser(todo.userId);
                    }}
                    className={
                      cn('TodoList__user-button', {
                        'TodoList__user-button--selected': todo.completed,
                        '': !todo.completed,
                      })
                    }
                    type="button"
                  >
                    User&nbsp;
                    {todo.userId}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

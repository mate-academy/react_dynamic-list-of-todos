import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';

type Props = {
  getTodos: () => Promise<Todo[]>;
  selectedUserId: number;
  changeUser: (id: number) => void;
};
type State = {
  todos: Todo[];
  query: string;
  todoSelectValue: string;
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    query: '',
    todoSelectValue: 'all',
  };

  componentDidMount() {
    this.props.getTodos()
      .then(todos => {
        this.setState({
          todos,
        });
      });
  }

  eventHandler = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, type, value } = event.target;

    if (type === 'text' && name === 'filterByTitle') {
      this.setState({
        query: value,
      });
    } else if (name === 'todoSelect') {
      if (this.state.todoSelectValue !== value) {
        this.setState({
          todoSelectValue: value,
        });
      }
    } else {
      this.setState((prevState) => {
        return ({
          todos: prevState.todos.map(todo => {
            if (todo.id === +name) {
              return ({
                ...todo,
                completed: !todo.completed,
              });
            }

            return todo;
          }),
        });
      });
    }
  };

  selectTodos = (todos: Todo[], value: string): Todo[] => {
    return (
      todos.filter(todo => {
        if (value === 'active') {
          return todo.completed === false;
        }

        if (value === 'completed') {
          return todo.completed === true;
        }

        return todo;
      })
    );
  };

  filterTodos = (todos: Todo[], query: string): Todo[] => {
    return (
      todos.filter(todo => {
        return (
          todo.title.toLowerCase().includes(query.toLowerCase())
        );
      })
    );
  };

  render() {
    const { todos, query, todoSelectValue } = this.state;
    const { changeUser } = this.props;

    const todosSelected: Todo[] = this.selectTodos(todos, todoSelectValue);

    const filteredTodos: Todo[] = this.filterTodos(todosSelected, query);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <div className="d-flex justify-content-end">
          <div className="
            form-floating
            mb-3
            TodoList__input-container
            w-50"
          >
            <input
              type="text"
              className="form-control"
              id="floatingTitle"
              placeholder="Filter todo items"
              name="filterByTitle"
              value={query}
              onChange={this.eventHandler}
            />
            <label htmlFor="floatingTitle">Filter todo items</label>
          </div>
          <div className="
            w-50
            d-flex
            justify-content-end
            align-items-center
            mb-3"
          >
            <label
              htmlFor="todoSelect"
              className="todo__user-container w-75"
            >
              <select
                className="form-select"
                required
                id="todoSelect"
                name="todoSelect"
                value={todoSelectValue}
                onChange={this.eventHandler}
              >
                <option value="all">show all</option>
                <option value="active">active (not completed)</option>
                <option value="completed">completed</option>
              </select>
            </label>
          </div>
        </div>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map(todo => {
              return (
                <li
                  key={todo.id}
                  className={
                    classNames(
                      'TodoList__item',
                      {
                        'TodoList__item--checked': todo.completed,
                        'TodoList__item--unchecked': !todo.completed,
                      },
                    )
                  }
                >
                  <label>
                    <input
                      name={`${todo.id}`}
                      type="checkbox"
                      readOnly
                      checked={todo.completed}
                      onChange={this.eventHandler}
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
                    onClick={() => changeUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
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

import React from 'react';
import cn from 'classnames';
import './TodoList.scss';
import { getTodosFromServer, getTodosByStatus } from '../../api/loadData';

type Props = {
  setUserId: (userId: number) => void,
};

type State = {
  todos: Todo[],
  searchInput: string,
  status: string,
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    todos: [],
    searchInput: '',
    status: 'all',
  };

  async componentDidMount() {
    const todos = await getTodosFromServer();

    this.setState({
      todos: [...todos],
    });
  }

  componentDidUpdate(_: {}, prevState: State) {
    const { status } = this.state;

    if (status !== prevState.status) {
      this.loadTodosByStatus();
    }
  }

  getTodosBySearch = (todos: Todo[], searchInput: string): Todo[] => {
    return todos.filter(todo => (
      todo.title.toLowerCase().includes(searchInput.toLowerCase())
    ));
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchInput: event.target.value,
    });
  };

  handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      status: event.target.value,
    });
  };

  async loadTodosByStatus() {
    const { status } = this.state;
    const todos = await getTodosByStatus(status);

    this.setState({ todos });
  }

  render() {
    const { setUserId } = this.props;
    const { todos, searchInput, status } = this.state;
    const visibleTodos = this.getTodosBySearch(todos, searchInput);

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <input
          type="text"
          id="search-query"
          placeholder="Search"
          className="TodoList__input"
          value={searchInput}
          onChange={this.handleSearchChange}
        />

        <select
          name="status"
          id="status"
          className="TodoList__select"
          value={status}
          onChange={this.handleStatusChange}
        >
          <option value="all">All</option>
          <option value="false">Active</option>
          <option value="true">Completed</option>
        </select>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">

            {visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={cn('TodoList__item', {
                  'TodoList__item--checkec': todo.completed,
                  'TodoList__item--unckecked': !todo.completed,
                })}
              >
                <label htmlFor={`Todo-${todo.id}`}>
                  <input
                    id={`Todo-${todo.id}`}
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
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
                  onClick={() => setUserId(todo.userId)}
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

// export const TodoList: React.FC<Props> = ({ todos, setUserId }) => (
//   <div className="TodoList">
//     <h2>Todos:</h2>

//     <input
//       type="text"
//     />

//     <div className="TodoList__list-container">
//       <ul className="TodoList__list">

//         {todos.map(todo => (
//           <li
//             key={todo.id}
//             className={cn('TodoList__item', {
//               'TodoList__item--checkec': todo.completed,
//               'TodoList__item--unckecked': !todo.completed,
//             })}
//           >
//             <label htmlFor={`Todo-${todo.id}`}>
//               <input
//                 id={`Todo-${todo.id}`}
//                 type="checkbox"
//                 readOnly
//                 checked={todo.completed}
//               />

//               <p>{todo.title}</p>
//             </label>

//             <button
//               className="
//                 TodoList__user-button
//                 TodoList__user-button--selected
//                 button
//               "
//               type="button"
//               onClick={() => setUserId(todo.userId)}
//             >
//               User&nbsp;#
//               {todo.userId}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </div>
// );

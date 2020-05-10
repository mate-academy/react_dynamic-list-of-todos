import React from 'react';
import './App.css';
import { TodoList } from './component/TodoList/TodoList';
import { getFromServer } from './component/Api';
import { TodoType, UserType } from './component/Types';

const TodosUrl = 'https://jsonplaceholder.typicode.com/todos';
const UsersUrl = 'https://jsonplaceholder.typicode.com/users';

interface State {
  isInitialized: boolean;
  preparedTodos: Array<TodoType>;
  isLoaded: boolean;
}

class App extends React.Component {
  state: State = {
    isInitialized: false,
    preparedTodos: [],
    isLoaded: false,
  };

  onLoadClick = () => {
    this.setState({ isInitialized: true });

    let todos: TodoType[];
    let users: UserType[];

    getFromServer(TodosUrl).then((result) => {
      todos = result;

      getFromServer(UsersUrl).then((resolve) => {
        users = resolve;

        const preparedTodos = todos.map((todo: TodoType) => {
          const current = { ...todo };

          current.user = users.find((user: UserType) => user.id === todo.userId);

          return current;
        });

        this.setState({
          preparedTodos,
          isLoaded: true,
        });
      });
    });
  };

  onSort = (sortBy: string) => {
    this.setState((state: State) => {
      const sortedTodos = [...state.preparedTodos];

      switch (sortBy) {
        case 'title':
          sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
          break;

        case 'status':
          sortedTodos.sort((a, b) => {
            if (a.completed === b.completed) {
              return 0;
            }

            if (a.completed) {
              return 1;
            }

            return -1;
          });
          break;

        case 'name':
          sortedTodos.sort((a, b) => {
            if (a.user !== undefined && b.user !== undefined) {
              return a.user.name.localeCompare(b.user.name);
            }

            return 0;
          });
          break;

        default:
          return {};
      }

      return { preparedTodos: sortedTodos };
    });
  };

  render() {
    const {
      isInitialized,
      preparedTodos,
      isLoaded,
    } = this.state;

    return (
      <>
        {isInitialized && !isLoaded && (
          <p>Loading...</p>
        )}
        {!isInitialized && (
          <button type="button" onClick={this.onLoadClick}>
            Load
          </button>
        )}
        {preparedTodos.length !== 0 && (
          <div className="App">
            <span>Sort by:</span>
            <button type="button" onClick={() => this.onSort('title')}>
              title
            </button>
            <button type="button" onClick={() => this.onSort('status')}>
              status
            </button>
            <button type="button" onClick={() => this.onSort('name')}>
              name
            </button>
            <div className="list-wrapper">
              <TodoList list={preparedTodos} />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default App;

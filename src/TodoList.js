import React from 'react';
import './App.css';
import TodoItem from './TodoItem';
import { getTodos, getUsers } from './todosApi';

class TodoList extends React.Component {
  state = {
    isLoading: false,
    isShown: true,
    defaultpreparedTodos: [],
    preparedTodos: [],
    todos: [],
    users: [],
  }

    showPreparedTodos = async() => {
      this.setState({
        isLoading: true,
      });
      await this.loadAllData();
      this.prepareData();
    };

    loadAllData = async() => {
      this.setState({
        todos: await getTodos(),
        users: await getUsers(),
      });
    }

    prepareData = () => {
      const { todos, users } = this.state;

      const getPrepareTodos = () => todos.map((todo) => {
        const user = users.find(person => person.id === todo.userId);

        return {
          ...todo,
          user,
        };
      });

      this.setState({
        preparedTodos: getPrepareTodos(),
        defaultpreparedTodos: getPrepareTodos(),
        isLoading: false,
        isShown: false,
      });
    }

  sortByTitle = () => {
    this.setState(prevState => ({
      preparedTodos: [...prevState.defaultpreparedTodos]
        .sort((a, b) => a.title.localeCompare(b.title)),
    }));
  };

  sortByUser = () => {
    this.setState(prevState => ({
      preparedTodos: [...prevState.defaultpreparedTodos]
        .sort((a, b) => a.user.name.localeCompare(b.user.name)),
    }));
  };

  sortByStatus = () => {
    this.setState(prevState => ({
      preparedTodos: [...prevState.defaultpreparedTodos]
        .sort((a, b) => a.completed - b.completed),
    }));
  };

  sortById = () => {
    this.setState(prevState => ({
      preparedTodos: [...prevState.defaultpreparedTodos]
        .sort((a, b) => a.id - b.id),
    }));
  };

  render() {
    const { isShown, isLoading, preparedTodos } = this.state;

    const sortList = [
      {
        title: 'id', callback: this.sortById,
      },
      {
        title: 'title', callback: this.sortByTitle,
      },
      {
        title: 'status', callback: this.sortByStatus,
      },
      {
        title: 'user', callback: this.sortByUser,
      },
    ];

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        {
          isShown ? (
            <button
              type="button"
              onClick={() => {
                this.showPreparedTodos();
              }}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    {sortList.map(sort => (
                      <th
                        onClick={sort.callback}
                      >
                        {sort.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preparedTodos.map(todo => (
                    <TodoItem todo={todo} />
                  ))}
                </tbody>

              </table>
            </>
          )
        }
      </div>
    );
  }
}
export default TodoList;

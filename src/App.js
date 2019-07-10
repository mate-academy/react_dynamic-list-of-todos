import React from 'react';
import './App.css';

import { getTodos, getUsers} from './api/data';
import TodoList from './components/TodoList';

const getData = async () => {
  const todos = await getTodos();
  const users = await getUsers();

  return todos.map(todo => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    };
  });
};

class App extends React.Component {

  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  };

  loadData = async () => {
    const todos = await getData();
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoading: false,
        isLoaded: true,
        todos: todos,
      });
    }, 2000);

  };

  render() {
    const { todos, isLoaded, isLoading } = this.state;
    return (
      <main>
        <div className='center'>
          <h1>List of Todos</h1>
          {isLoaded ? (
            <div>
              <h2>({todos.length} items)</h2>
              <TodoList todos={todos} />
            </div>
          ) : (
              <div>
                <h2>({todos.length} items)</h2>
                <button onClick={this.loadData}>
                  {isLoading ? 'Loading...' : 'Load'}
                </button>
              </div>
            )}
        </div>
      </main>
    );
  }
}

export default App;

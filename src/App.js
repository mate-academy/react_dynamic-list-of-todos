import React from 'react';
import './App.css';
import TodoList from './component/Todolist';
import getSort from './component/getSort';
import getTodos from './component/getTodos';
import getUsers from './component/getUsers';

let todosFromServer = [];

class App extends React.Component {
  state = {
    todos: [],
    visibleTodos: [],
    isLoaded: false,
    isLoading: false,
    sortField: 'id',
  };

  async componentDidMount() {
    const todos = await getTodos();
    const users = await getUsers();
    todosFromServer = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }))
  }

  sortBy = (sortField) => {

    this.setState(prevState => {
      return {
        visibleTodos: getSort(prevState.visibleTodos, sortField, prevState.sortField === sortField),
        sortField,
      };
    });
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        todos: todosFromServer,
        visibleTodos: todosFromServer,
        isLoaded: true,
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const {visibleTodos, isLoaded, isLoading} = this.state;
    return (
      <main>
        {isLoaded ? (
          <div className="App">
            <h1>Dynamic list of todos</h1>
            <h3> try to sort {this.state.sortField}</h3>
            <button onClick={() => this.sortBy('id')}>ID</button>
            <button onClick={() => this.sortBy('user')}>USER</button>
            <button onClick={() => this.sortBy('completed')}>DONE</button>
            <button onClick={() => this.sortBy('title')}>TASK</button>
            <TodoList todos={visibleTodos} />
          </div>
        ) : (
          <button className="load" onClick={this.handleClick}>
            {isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </main>
    );
  }
};

export default App;

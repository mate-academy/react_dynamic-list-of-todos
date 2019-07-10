import React from 'react';
import User from './components/User';
import TodoList from './components/TodoList';
import './App.css';
import getData from './components/dataComponents';

const getDataList = async() => {
  const todos = await getData('https://jsonplaceholder.typicode.com/todos');
  const users = await getData('https://jsonplaceholder.typicode.com/users');

  return todos.map(todo => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    };
  });
};
const getSortedTodos = ({ todos, sortField, direction }) => {
  const callbackMap = {
    id: (a, b) => direction * (a.id - b.id),
    completed: (a, b) => direction * (a.completed - b.completed),
    title: (a, b) => direction * (a.title.localeCompare(b.title)),
    user: (a, b) => direction
      * (a.user.username.localeCompare(b.user.username)),
  };

  const callback = callbackMap[sortField] || callbackMap.id;

  return [...todos].sort(callback);
};
class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
    visibleTodos: [],
    sortField: 'id',
    direction: 1,
  };

  loadData = async() => {
    this.setState({
      isLoading: true,
    });
    const todos = await getDataList();
    this.setState(prevState => ({
      todos,
      visibleTodos: getSortedTodos(prevState),
      isLoaded: true,
      isLoading: false,
    }));
  };

  sortBy = (sortField) => {
    this.setState(prevState => {
      return {
        visibleTodos: getSortedTodos(prevState),
        sortField: sortField,
        direction: prevState.direction === 1 ? -1 : 1,
      };
    });
  };

  render() {
    const { sortField, visibleTodos } = this.state;
    const res = this.state.visibleTodos.map(todo => (
      <div key={todo.id} className="todo">
        <TodoList item={todo} />
        <User users={todo.user} />
      </div>
    ));
    if (!this.state.isLoaded) {
      return (
        <button
          type="submit"
          className="btn btn-success mt-5"
          onClick={this.loadData}
          disabled={this.state.isLoading}
        >
          {this.state.isLoading ? 'Loading...' : 'Load' }
        </button>
      );
    }

    return (
      <main className="App container">
        <h1>{visibleTodos.length}
           sorted by {sortField}
        </h1>
        <button
          type="submit"
          className="btn btn-primary mt-5 mb-5 mr-3"
          onClick={() => this.sortBy('completed')}>Completed</button>
        <button
          type="submit"
          className="btn btn-primary mt-5 mb-5 mr-3"
          onClick={() => this.sortBy('title')}>Title</button>
        <button
          type="submit"
          className="btn btn-primary mt-5 mb-5 mr-3"
          onClick={() => this.sortBy('user')}>User</button>
        <div>{res}</div>
      </main>
    );
  }
}

export default App;

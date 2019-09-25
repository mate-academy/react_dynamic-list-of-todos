import React from 'react';

import './App.css';
import TodoList from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    active: 0,
    sorted: false,
    todosWithUsers: [],
  }

  sortAZ = () => {
    this.setState(prevState => ({
      todosWithUsers: prevState.sorted === false
        ? prevState.todosWithUsers
          .sort((a, b) => a.title.localeCompare(b.title))
        : prevState.todosWithUsers
          .sort((a, b) => a.title.localeCompare(b.title)).reverse(),
      sorted: !prevState.sorted,
    }));
  }

  loadDatas = () => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(users => users.json()),
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(todos => todos.json()),
    ])
      .then(([users, todos]) => {
        this.setState({
          active: 1,
          todosWithUsers: todos.map(todo => ({
            ...todo,
            user: users.find(user => user.id === todo.userId),
          })),
        });
      });
  }

  render() {
    const { todosWithUsers, active } = this.state;
    return (
      <>
        <h1 className="h1">Dynamic list of todos</h1>
        <div className={active === 1 ? 'button-back down' : 'button-back'}>
          Loading...
        </div>
        <button
          onClick={this.loadDatas}
          className={active === 1 ? 'button-start down' : 'button-start'}
          type="button"
        >
          Load
        </button>
        {!!active && (
          <button
            type="button"
            onClick={this.sortAZ}
            className="sort"
          >
          Title A-Z
          </button>
        )}
        <TodoList todos={todosWithUsers} />
      </>
    );
  }
}

export default App;

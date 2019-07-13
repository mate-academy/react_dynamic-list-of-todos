import React from 'react';

import getDataJson from './components/GetDataJson';
import TodoList from './components/TodoList';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loadBtn: '!!! Load !!!',
      users: [],
      todos: [],
      todosWithUsers: [],
    };
  }

  handleBtnClick = async() => {
    this.setState(() => (
      { loadBtn: 'Loading ...' }
    ));

    const usersJson = await getDataJson('https://jsonplaceholder.typicode.com/users');
    const todosJson = await getDataJson('https://jsonplaceholder.typicode.com/todos');
    const todoWithUsers = todosJson.map(todo => (
      {
        ...todo,
        user: usersJson.find(user => user.id === todo.userId),
      }
    ));

    this.setState(() => (
      {
        users: [...usersJson],
        todos: [...todosJson],
        todosWithUsers: [...todoWithUsers],
        loadBtn: 'Done',
      }
    ));
  }

  handleTodoStatusChange = (id) => {
    this.setState((prevState) => {
      return {
        todosWithUsers: prevState.todosWithUsers.map((todo) => {
          todo.completed = todo.id === id
            ? !todo.completed
            : todo.completed;
          return todo;
        }),
      };
    });
  }

  render() {
    return (
      <div className="App">
        <h1>
          Dynamic list of&nbsp;
          {this.state.todos[0]
            ? this.state.todos.length
            : null}
          &nbsp;todos&nbsp;
          {this.state.loadBtn === '!!! Load !!!'
            ? null
            : `- ${this.state.loadBtn}`}
        </h1>

        { this.state.loadBtn === 'Done'
          ? <TodoList
              todos={this.state.todosWithUsers}
              handleFunction={this.handleTodoStatusChange}
            />
          : (
              <button onClick={this.handleBtnClick}>
                {this.state.loadBtn}
              </button>
            )
        }
      </div>
    );
  }
}

export default App;

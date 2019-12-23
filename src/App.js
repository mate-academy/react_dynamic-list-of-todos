import React from 'react';
import './App.css';

import TodoList from './components/TodoList';

const BaseUrl = 'https://jsonplaceholder.typicode.com/';

function getTodosWithUsers(todos, users) {
  return todos.map(item => ({
    ...item,
    user: users.find(elem => elem.id === item.userId),
  }));
}

class App extends React.Component {
  state = {
    loading: false,
    todosWithUsers: [],
  };

  getDataFromServer = async(url) => {
    const response = await fetch(`${BaseUrl}${url}`);
    return response.json();
  };

  getTodosList = async() => {
    const [todos, users] = await Promise.all([
      this.getDataFromServer('todos'),
      this.getDataFromServer('users'),
    ]);

    return getTodosWithUsers(todos, users);
  };

  loadTodos = async() => {
    this.setState({
      loading: true,
    });
    this.setState({
      todosWithUsers: await this.getTodosList(),
    });
  }

  sortTableBy = (title) => {
    console.log();
    if (title === 'title') {
      this.setState(prevState => ({
        todosWithUsers: [...prevState.todosWithUsers].sort(
          (a, b) => {
            console.log(b[title]);
            return b[title].length - a[title].length;
          }
        ),
      }));
    }

    if (title === 'completed') {
      this.setState(prevState => ({
        todosWithUsers: [...prevState.todosWithUsers].sort(
          (a, b) => {
            console.log(b[title]);
            return b[title] - a[title];
          }
        ),
      }));
    }

    if (title === 'email') {
      this.setState(prevState => ({
        todosWithUsers: [...prevState.todosWithUsers].sort(
          (a, b) => {
            console.log(b[title]);
            return b.user[title].length - a.user[title].length;
          }
        ),
      }));
    }
  }

  render() {
    const { todosWithUsers, loading } = this.state;

    return (
      <>
        <div className="App">
          <h1>Dynamic list of todos</h1>
          {(loading && todosWithUsers.length === 0)
            && 'loading...'
          }
          {(!loading && todosWithUsers.length === 0)
            && <button type="button" onClick={this.loadTodos}>Download</button>
          }
          {todosWithUsers.length !== 0
            && (
              <TodoList
                todos={todosWithUsers}
                sortTableBy={this.sortTableBy}
                // sortByStatus={this.sortByStatus}
                sortByMail={this.sortByMail}
              />
            )
          }
        </div>
      </>
    );
  }
}

export default App;

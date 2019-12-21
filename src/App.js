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
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      todosWithUsers: [],
    };
  }

  getDataFromServer = async(url) => {
    const response = await fetch(`${BaseUrl}${url}`);
    return response.json();
  };

  getTodosList = async() => {
    const todosandUser = await Promise.all([
      this.getDataFromServer('todos'),
      this.getDataFromServer('users'),
    ]);

    return getTodosWithUsers(todosandUser[0], todosandUser[1]);
  };

  loadTodos = async() => {
    this.setState({
      loading: true,
    });
    this.setState({
      todosWithUsers: await this.getTodosList(),
    });
  }

  sortByStatus = () => {
    this.setState(prevState => ({
      todosWithUsers: [...prevState.todosWithUsers].sort(
        (a, b) => b.completed - a.completed
      ),
    }));
  }

  sortByTitleLength = () => {
    this.setState(prevState => ({
      todosWithUsers: [...prevState.todosWithUsers].sort(
        (a, b) => b.title.length - a.title.length
      ),
    }));
  }

  sortByMail = () => {
    this.setState(prevState => ({
      todosWithUsers: [...prevState.todosWithUsers].sort(
        (a, b) => b.user.email.localeCompare(a.user.email)
      ),
    }));
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
                sortByTitleLength={this.sortByTitleLength}
                sortByStatus={this.sortByStatus}
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

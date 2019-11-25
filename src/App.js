import React from 'react';
import './App.css';

// import todos from './api/todos';
// import users from './api/users';

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

    this.sortByTitleLength = this.sortByTitleLength.bind(this);
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

  sortByTitleLength() {
    console.log(this.state.todosWithUsers);
    this.setState(prevState => ({
      todosWithUsers: [...prevState.todosWithUsers].sort(
        (a, b) => b.title.length - a.title.length
      ),
    }));
  }

  render() {
    return (
      <>
        <div className="App">
          <h1>Dynamic list of todos</h1>
          {(this.state.loading && this.state.todosWithUsers.length === 0)
            ? 'loading...' : ''
          }
          {(!this.state.loading && this.state.todosWithUsers.length === 0)
            ? <button type="button" onClick={this.loadTodos}>Download</button>
            : ''
          }
          {this.state.todosWithUsers.length === 0
            ? ''
            : (
              <>
                <button
                  type="button"
                  onClick={this.sortByTitleLength}
                >
                  sortByTitleLength
                </button>
                <TodoList todos={this.state.todosWithUsers} />
              </>
            )}
        </div>
      </>
    );
  }
}

export default App;

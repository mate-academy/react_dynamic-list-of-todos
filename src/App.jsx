import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/todos';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then(todos => (
        this.setState({
          todos: todos.filter(todo => todo.title && todo.userId),
        })
      ));
  }

  getUserId = userId => (
    this.setState({
      selectedUserId: userId,
    })
  )

  render() {
    const { todos, selectedUserId } = this.state;

    console.log(todos);

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0 && (
            <TodoList
              todos={todos}
              getUserId={this.getUserId}
              selectedUserId={selectedUserId}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                getUserId={this.getUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

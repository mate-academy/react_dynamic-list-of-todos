import React from 'react';
import './App.scss';
import './styles/general.scss';

import { getTodos } from './api/api';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos : todos.data });
    });
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  changeStatus = (todoId) => {
    this.setState(prevState => ({
      todos: [...prevState.todos].map(todo => {
        if (todo.id === todoId) {
          todo.completed = !todo.completed
        }
        return todo
      })
    })
    )
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0 &&
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            changeStatus={this.changeStatus}
          />}
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

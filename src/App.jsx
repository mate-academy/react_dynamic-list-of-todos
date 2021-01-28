import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos().then(result => (
      this.setState({
        todos: result.data.filter(todo => todo.userId),
      })
    ));
  }

  checkTodo = (todoId) => {
    const foundTodo = this.state.todos.find(todo => todo.id === todoId);

    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === foundTodo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={userId => this.setState({ selectedUserId: userId })}
            selectedUser={selectedUserId}
            todoCheck={this.checkTodo}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                removeUser={() => {
                  this.setState({ selectedUserId: 0 });
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

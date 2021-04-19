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

  async componentDidMount() {
    let todos = await getTodos();

    todos = todos.filter(todo => !!todo.id && !!todo.userId);

    this.setState({ todos });
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  handleCheck = (id) => {
    this.setState(
      state => ({
        todos: state.todos.map((todo) => {
          if (todo.id !== id) {
            return todo;
          }

          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      }),
    );
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            handleCheck={this.handleCheck}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

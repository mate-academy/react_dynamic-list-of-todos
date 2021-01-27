import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todosFromServer = await getAllTodos();

    this.setState({
      todos: todosFromServer.data.filter(todo => todo.title && todo.userId),
    });
  }

  onComplete = (todo) => {
    this.setState((state) => {
      const item = todo;

      item.completed = !item.completed;

      return {
        todos: [...state.todos],
      };
    });
  }

  onUserSelect = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  onUserClear = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onComplete={this.onComplete}
            onUserSelect={this.onUserSelect}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onUserClear={this.onUserClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

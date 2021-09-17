import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  loadingError: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    loadingError: false,
  };

  componentDidMount() {
    getTodos()
      .then(todos => {
        this.setState({ todos });
      })
      .catch(() => {
        this.setState({ loadingError: true });
      });
  }

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  completeTask = (id: number) => {
    this.setState(currentState => (
      {
        todos: currentState.todos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: true,
            };
          }

          return todo;
        }),
      }
    ));
  };

  render() {
    const { selectedUserId, todos, loadingError } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {loadingError ? (
            <p>Loading error. Please, try again...</p>
          ) : (
            <TodoList
              selectUser={this.selectUser}
              todos={todos}
              onComplete={this.completeTask}
              selectedUser={selectedUserId}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                selectUser={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

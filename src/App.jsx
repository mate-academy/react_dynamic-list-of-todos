import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { LoadingError } from './components/LoadingError';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedTodoId: 0,
    hasLoadingError: false,
  };

  async componentDidMount() {
    try {
      const todos = await getTodos();

      this.setState({
        todos: todos.filter(todo => todo.userId !== null),
      });
    } catch (error) {
      this.setState({
        hasLoadingError: true,
      });
    }
  }

  selectUser = (selectedUserId, selectedTodoId) => {
    this.setState({
      selectedUserId,
      selectedTodoId,
    });
  }

  clearSelectedUser = () => {
    this.setState({
      selectedUserId: 0,
      selectedTodoId: 0,
    });
  }

  render() {
    const {
      todos,
      selectedUserId,
      hasLoadingError,
      selectedTodoId,
    } = this.state;
    const { selectUser, clearSelectedUser } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            selectedTodoId={selectedTodoId}
            selectUser={selectUser}
          />
          {hasLoadingError && <LoadingError />}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearSelectedUser={clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

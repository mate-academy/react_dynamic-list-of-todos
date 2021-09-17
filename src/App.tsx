import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadTodos } from './api/api';

interface State {
  todos: Todo[];
  selectedUserId: number;
  errorMessage: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
    errorMessage: '',
  };

  componentDidMount() {
    this.getTodos();
  }

  getTodos = async () => {
    try {
      const todos = await loadTodos();

      this.setState({ todos });
    } catch (error) {
      this.setState({ errorMessage: 'Error of loading' });
    }
  };

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clear = () => {
    this.setState({ selectedUserId: 0 });
  };

  render() {
    const { todos, selectedUserId, errorMessage } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {!errorMessage
            ? (
              <TodoList
                todos={todos}
                selectUser={this.selectUser}
              />
            )
            : (
              { errorMessage }
            )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clear={this.clear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

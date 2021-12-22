import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { requestTodos } from './api';
import { Todo } from './react-app-env';

interface State {
  selectedUserId: number;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  componentDidMount() {
    this.loadTodos();
  }

  onSelect = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  onClear = () => {
    this.setState({ selectedUserId: 0 });
  };

  loadTodos = async () => {
    const todos = await requestTodos();

    this.setState({ todos });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            onSelectUser={this.onSelect}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} onClearUser={this.onClear} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

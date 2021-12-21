import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
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
    this.loadData();
  }

  onSelect = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  onClear = () => {
    this.setState({ selectedUserId: 0 });
  };

  async loadData() {
    this.setState({ todos: await getTodos() });
  }

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.state.todos}
            selectedUserId={this.state.selectedUserId}
            onSelect={this.onSelect}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} onClear={this.onClear} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

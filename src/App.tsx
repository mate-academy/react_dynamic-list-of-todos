/* eslint-disable react/no-unused-state */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api';
import { Todo } from './react-app-env';

interface State {
  selectedUserId: number;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 1,
    todos: [],
  };

  componentDidMount() {
    this.load();
  }

  onSelect = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clear = () => {
    this.setState({ selectedUserId: 0 });
  };

  async load() {
    this.setState({ todos: await getTodos() });
  }

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            onSelect={this.onSelect}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
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

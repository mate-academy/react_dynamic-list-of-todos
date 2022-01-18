import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './api/api';

interface State {
  todos: Todo[],
  selectedUserId: number,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getData('/todos');

    this.setState({ todos });
  }

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList todos={todos} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

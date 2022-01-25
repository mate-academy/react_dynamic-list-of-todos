import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import CurrentUser from './components/CurrentUser';
import { getTodos } from './api/api';

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
    getTodos()
      .then(todo => {
        this.setState({
          todos: todo,
        });
      });
  }

  userSelect = (id: number) => {
    if (id !== this.state.selectedUserId) {
      this.setState({
        selectedUserId: id,
      });
    }
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.userSelect}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectUser={this.userSelect}
                selectedUserId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

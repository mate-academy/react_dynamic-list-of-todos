import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
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

  selectUser = (id: number) => {
    if (id !== this.state.selectedUserId) {
      this.setState({
        selectedUserId: id,
      });
    }
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.state.todos}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
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

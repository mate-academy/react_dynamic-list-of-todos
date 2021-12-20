import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Todo } from './components/types/Todo';

interface State {
  selectedUserId: number;
  todos: Todo[] | null
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: null,
  };

  componentDidMount() {
    getTodos()
      .then(todosFromServer => {
        this.setState({ todos: todosFromServer });
      });
  }

  toSelectUser = (userId: number) => {
    if (userId !== this.state.selectedUserId) {
      this.setState({
        selectedUserId: userId,
      });
    }
  };

  render() {
    const { selectedUserId } = this.state;

    return (
      <div className="App">
        {this.state.todos && (
          <div className="App__sidebar">
            <TodoList todos={this.state.todos} callback={this.toSelectUser} />
          </div>
        )}

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={this.state.selectedUserId} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

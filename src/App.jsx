import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    selectedTodoId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  handleSelection = (userId, todoId) => {
    this.setState({
      selectedUserId: userId,
      selectedTodoId: todoId,
    });
  }

  handleClear = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId, selectedTodoId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.handleSelection}
            selectedUserId={selectedUserId}
            selectedTodoId={selectedTodoId}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.handleClear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

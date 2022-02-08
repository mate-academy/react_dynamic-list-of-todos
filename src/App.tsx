import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getAllTodo } from './api/todos';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

interface State {
  selectedUserId: number;
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
  };

  async componentDidMount() {
    const todos = await getAllTodo();

    this.setState({
      todos: [...todos],
    });
  }

  handleUserIdChange = (todo: Todo) => {
    this.setState({
      selectedUserId: todo.userId,
    });
  };

  clearUserDetails = () => {
    this.setState({
      selectedUserId: 0,
    });
  };

  render() {
    const { selectedUserId, todos } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            handleUserIdChange={this.handleUserIdChange}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} clearUserDetails={this.clearUserDetails} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

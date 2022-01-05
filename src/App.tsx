import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
import { Todo } from './types/Todo';

interface State {
  selectedUserId: number;
  todos: Todo[];
  todoId: number;
  isLoading: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    todoId: 0,
    isLoading: false,
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos,
      isLoading: true,
    });
  }

  selectUser = (selectedUserId: number, todoId: number) => {
    this.setState({ selectedUserId, todoId });
  };

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
      todoId: 0,
    });
  };

  render() {
    const {
      selectedUserId,
      todos,
      todoId,
      isLoading,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {isLoading
            ? (
              <TodoList
                todos={todos}
                todoId={todoId}
                selectUser={this.selectUser}
              />
            )
            : <span>Is Loading...</span>}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser selectedUserId={selectedUserId} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  isLoading: boolean;
  errorMessage: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    isLoading: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = async () => {
    this.setState({ isLoading: true });

    try {
      const todos = await getTodos();

      this.setState({
        todos,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: 'Cant load todos',
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  selectUser = (userId: number) => {
    this.setState({ selectedUserId: userId });
  };

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  handleChecked = (id:number) => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todos: newTodos,
    }));
  };

  render() {
    const { selectedUserId, todos, isLoading } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {this.state.errorMessage}

          {isLoading
            ? 'loading'
            : (
              <TodoList
                todos={todos}
                selectedUserId={selectedUserId}
                onSelectUser={this.selectUser}
                handleChecked={this.handleChecked}
              />
            )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} onClear={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

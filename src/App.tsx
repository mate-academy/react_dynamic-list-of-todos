/* eslint-disable no-console */
import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

interface State {
  selectedUserId: number;
  todos: Todo[];
  loading: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    selectedUserId: 0,
    todos: [],
    loading: false,
  };

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = async () => {
    this.setState({ loading: true });

    try {
      const todos = await getTodos();

      this.setState({
        todos,
        loading: false,
      });
    } catch (error) {
      console.warn(error);
      this.setState({
        loading: false,
      });
    }
  };

  selectUser = (id:number) => {
    this.setState({ selectedUserId: id });
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
    const { selectedUserId, todos, loading } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {loading
            ? 'loading'
            : (
              <TodoList
                todos={todos}
                selectUser={this.selectUser}
                selectedUserId={selectedUserId}
                handleChecked={this.handleChecked}
              />
            )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

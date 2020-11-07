import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    const todos = await getTodos();
    const preparedTodos = todos.filter(todo => todo.title && todo.userId);

    this.setState({
      todos: preparedTodos,
    });
  }

  selectUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  filterTodosByStatus = (value) => {
    if (value === 'all') {
      this.setState(state => ({
        todos: [...state.todos],
      }));
    } else if (value === 'completed') {
      this.setState(state => ({
        todos: state.todos.filter(todo => todo.completed),
      }));
    } else if (value === 'active') {
      this.setState(state => ({
        todos: state.todos.filter(todo => !todo.completed),
      }));
    }
  }

  filterTodosByTitle = (value, field) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo[field].includes(value)),
    }));
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            selectUser={this.selectUser}
            filterUser={this.filterTodosByTitle}
            filterUserByCompleted={this.filterTodosByStatus}
          />
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

import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    copy: [],
    selectedUserId: 0,
  };

  async componentDidMount() {
    getTodos().then((todos) => {
      this.setState({
        todos: todos.data, copy: todos.data,
      });
    });
  }

  findUserId = (userId) => {
    if (this.state.selectedUserId === userId) {
      return;
    }

    this.setState({ selectedUserId: userId });
  }

  filterUser = (complete) => {
    const { copy } = this.state;

    if (complete === 'all') {
      this.setState({ todos: copy });
    } else {
      const filter = copy.filter(
        todo => todo.completed === (complete === 'true'),
      );

      this.setState({ todos: filter });
    }
  }

  searchTodo = (text) => {
    const filter = this.state.copy.filter(todo => todo.title !== null && todo.title !== '')
    const result = filter.filter(todo => todo.title.includes(text))

    this.setState({ todos: result });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            userId={selectedUserId}
            findUserId={this.findUserId}
            filterUser={this.filterUser}
            searchTodo={this.searchTodo}
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

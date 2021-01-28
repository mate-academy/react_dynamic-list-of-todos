import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './data/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    status: 'all',
    shuffle: false,
  };

  async componentDidMount() {
    const response = await getTodos();

    this.setState({
      todos: response.data.filter(todo => todo.userId),
    });
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearSelectedUser = () => {
    this.setState({ selectedUserId: 0 });
  };

  toCheckTodo = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ((todo.id !== todoId)
        ? todo
        : {
          ...todo,
          completed: !todo.completed,
        })),
    }));
  }

  toSearchFilter = e => this.setState({ query: e.target.value });

  toSelectFilter = e => this.setState({ status: e.target.value });

  toShuffle = () => {
    this.setState(state => ({
      shuffle: !state.shuffle,
    }));
  }

  render() {
    const { todos, selectedUserId, query, status, shuffle } = this.state;

    const todoSearch = (todo) => {
      const queryLow = query.toLowerCase();

      return todo.title.toLowerCase().includes(queryLow);
    };

    const statusSearch = (todo) => {
      switch (status) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return todo;
      }
    };

    const newTodos = todos.filter(todoSearch).filter(statusSearch);

    if (shuffle) {
      newTodos.sort(() => Math.random() - 0.5);
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={newTodos}
            toCheck={this.toCheckTodo}
            selectUser={this.selectUser}
            toSearch={this.toSearchFilter}
            toSelect={this.toSelectFilter}
            toShuffle={this.toShuffle}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clearUser={this.clearSelectedUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

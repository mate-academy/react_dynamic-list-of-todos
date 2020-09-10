import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    todosForRender: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({
        todos,
        todosForRender: todos,
      }));
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  handleChange = (query) => {
    this.setState(state => ({
      todosForRender: [...state.todos]
        .filter(todo => (todo.title
          ? todo.title.toLowerCase().includes(query.toLowerCase())
          : '')),

    }));
  }

  selectByCompleted = (value) => {
    if (value === 'active') {
      this.setState(state => ({
        todosForRender: [...state.todos]
          .filter(todo => !todo.completed),
      }));
    } else if (value === 'completed') {
      this.setState(state => ({
        todosForRender: [...state.todos]
          .filter(todo => todo.completed),
      }));
    } else {
      this.setState(state => ({
        todosForRender: [...state.todos],
      }));
    }
  }

  render() {
    const { todosForRender, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todosForRender}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            filterByTitle={this.handleChange}
            selectByCompleted={this.selectByCompleted}
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

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
      .then(todos => todos.filter(todo => todo.title))
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
      todosForRender: state.todos
        .filter(todo => (todo.title
          ? todo.title.toLowerCase().includes(query.toLowerCase())
          : '')),

    }));
  }

  selectByCompleted = (value) => {
    switch (value) {
      case 'active':
        this.setState(state => ({
          todosForRender: state.todos
            .filter(todo => !todo.completed),
        }));
        break;

      case 'completed':
        this.setState(state => ({
          todosForRender: state.todos
            .filter(todo => todo.completed),
        }));
        break;

      default:
        this.setState(state => ({
          todosForRender: state.todos,
        }));
    }
  }

  changeCompleted = (id) => {
    this.setState(state => ({
      todosForRender: state.todosForRender.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
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
            changeCompleted={this.changeCompleted}
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

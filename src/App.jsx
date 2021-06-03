import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    searchTitle: '',
    searchTodoStatus: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({
      todos: todos.data,
    });
  }

  updateSearchTitle = (value) => {
    this.setState({ searchTitle: value });
  };

  updateSearchTodoStatus = (status) => {
    this.setState({ searchTodoStatus: status });
  }

  visibleTodos = (todos) => {
    const { searchTitle, searchTodoStatus } = this.state;

    const normalizeQuery = searchTitle.toLowerCase().trim();

    let visibleTodos = [...todos];

    switch (searchTodoStatus) {
      case 'Active':
        visibleTodos = visibleTodos.filter(({ completed }) => !completed);
        break;
      case 'Completed':
        visibleTodos = visibleTodos.filter(({ completed }) => completed);
        break;
      default:
        break;
    }

    visibleTodos = visibleTodos.filter(
      todo => ((todo.title != null)
        ? todo.title.toLowerCase().includes(normalizeQuery) : todo.title),
    );

    return visibleTodos;
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.visibleTodos(todos)}
            selectedUserId={selectedUserId}
            updateSearchTitle={this.updateSearchTitle}
            updateSearchTodoStatus={this.updateSearchTodoStatus}
            selectUser={(userId) => {
              this.setState({ selectedUserId: userId });
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                selectUser={(userId) => {
                  this.setState({ selectedUserId: userId });
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

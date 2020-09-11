import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    statusFilter: 'All',
    titleFilter: '',
  };

  componentDidMount = async() => {
    const todos = await getTodos();

    this.setState({
      todos: todos.data.filter(todo => todo.title && todo.id && todo.userId),
    });
  }

  handleSelect = (event) => {
    this.setState({
      statusFilter: event.target.value,
    });
  }

  handleInputChange = (input) => {
    this.setState({
      titleFilter: input,
    });
  }

  setUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId, statusFilter, titleFilter } = this.state;

    let filteredByTitle;

    if (titleFilter) {
      filteredByTitle = todos.filter(todo => (
        todo.title && todo.title.includes(titleFilter)
      ));
    } else {
      filteredByTitle = todos;
    }

    let preparedTodos;

    switch (statusFilter) {
      case 'Completed':
        preparedTodos = filteredByTitle.filter(todo => todo.completed);
        break;
      case 'Not completed':
        preparedTodos = filteredByTitle.filter(todo => !todo.completed);
        break;
      default:
        preparedTodos = filteredByTitle;
        break;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={preparedTodos}
            handleSelect={this.handleSelect}
            handleChange={this.handleInputChange}
            statusFilter={statusFilter}
            titleFilter={titleFilter}
            setUser={this.setUser}
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

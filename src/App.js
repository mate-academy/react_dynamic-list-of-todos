import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    filterByChoise: 'Choose filter',
    filterByInput: '',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          todos: todos.filter(todo => todo.title && todo.id && todo.userId),
        });
      });
  }

  handleSelect = (event) => {
    this.setState({
      filterByChoise: event.target.value,
    });
  }

  handleInputChange = (input) => {
    this.setState({
      filterByInput: input,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  selectUser = id => this.setState({ selectedUserId: id });

  changeStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === +id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return { ...todo };
      }),
    }));
  }

  render() {
    const { todos, filterByChoise, filterByInput, selectedUserId } = this.state;

    let filteredByTitle;

    if (filterByInput) {
      filteredByTitle = todos.filter(todo => todo.title
        && todo.title.includes(filterByInput));
    } else {
      filteredByTitle = todos;
    }

    let preparedTodos;

    switch (filterByChoise) {
      case 'completed':
        preparedTodos = filteredByTitle
          .filter(todo => todo.completed);
        break;

      case 'active':
        preparedTodos = filteredByTitle
          .filter(todo => !todo.completed);
        break;

      default:
        preparedTodos = filteredByTitle;
        break;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          {this.state.todos.length}
          <TodoList
            todos={preparedTodos}
            selectUser={this.selectUser}
            handleSelect={this.handleSelect}
            handleInputChange={this.handleInputChange}
            changeStatus={this.changeStatus}
            filterByChoise={filterByChoise}
            filterByInput={filterByInput}
          />
        </div>

        <div className="App__content">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={this.clearUser}
            />
          ) : (
            'No user selected'
          )}
        </div>
      </div>
    );
  }
}

export default App;

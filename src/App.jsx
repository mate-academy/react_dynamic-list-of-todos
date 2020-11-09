import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Input } from './components/Input';
import { Select } from './components/Select';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    selectedUserId: 0,
    valueOnInput: '',
    valueOnSelect: 'all',
  };

  componentDidMount() {
    getTodos()
      .then((todos) => {
        const filteredTodos = todos.filter(todo => (
          todo.title && todo.id
        ));

        this.setState({
          todos: filteredTodos,
          filteredTodos,
        });
      });
  }

  selectedUser = (selectedUserId) => {
    this.setState({ selectedUserId });
  };

  filterOnInput = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      valueOnInput: value,
      filteredTodos: prevState.todos.filter(todo => (
        todo.title.includes(value)
      )),
    }));
  };

  filterBySelect = (event) => {
    const { value } = event.target;

    if (value === 'all') {
      this.setState(prevState => ({
        filteredTodos: prevState.todos,
        valueOnSelect: value,
      }));
    }

    const booleanValue = value === 'completed';

    if (value === 'completed' || value === 'not completed') {
      this.setState(prevState => ({
        filteredTodos: prevState.todos.filter(todo => (
          todo.completed === booleanValue
        )),
        valueOnSelect: value,
      }));
    }
  }

  render() {
    const {
      filteredTodos,
      selectedUserId,
      valueOnInput,
      valueOnSelect,
    } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <div className="App__filter">
            <Input
              valueOnInput={valueOnInput}
              filterOnInput={this.filterOnInput}
            />
            <Select
              valueOnSelect={valueOnSelect}
              filterBySelect={this.filterBySelect}
            />
          </div>
          <TodoList
            todos={filteredTodos}
            selectedUser={this.selectedUser}
          />
        </div>

        <div className="App__content">
          {selectedUserId
            ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                selectedUser={this.selectedUser}
              />
            ) : (
              <div className="App__text">Please, select a user</div>
            )}
        </div>
      </div>
    );
  }
}

export default App;

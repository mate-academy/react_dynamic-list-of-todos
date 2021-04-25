import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { request } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: '',
    query: '',
    selectValue: '',
  };

  componentDidMount() {
    request()
      .then(todos => this.setState({
        todos: todos.filter(todo => todo.title),
      }));
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  prepareTodos = () => {
    const { selectValue } = this.state;

    if (selectValue === 'active') {
      return this.state.todos.filter(
        todo => !todo.completed,
      );
    }

    if (selectValue === 'completed') {
      return this.state.todos.filter(
        todo => todo.completed,
      );
    }

    return this.state.todos;
  }

  render() {
    const { selectedUserId, query, selectValue } = this.state;
    const filteredTodos = this.prepareTodos().filter(
      todo => todo.title.includes(this.state.query),
    );

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodos}
            userId={selectedUserId}
            selectUser={this.selectUser}
            handleChange={this.handleChange}
            query={query}
            selectValue={selectValue}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                selectUser={this.selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

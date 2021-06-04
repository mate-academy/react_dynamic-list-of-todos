import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    title: '',
    selectedTypeOfTodos: 'all',
  };

  componentDidMount() {
    getTodos()
      .then(todos => this.setState({ todos }));
  }

  selectUser = (newUserId) => (
    this.setState({ selectedUserId: newUserId })
  );

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value})
  };

  render() {
    const {
      todos,
      selectedUserId,
      title,
      selectedTypeOfTodos,
    } = this.state;

    console.log(title);

    const filteredTodos = todos.filter(
      todo => {
        if (!todo.title) {
          return false;
        }

        if (selectedTypeOfTodos === 'all') {
          return todo.title.includes(title);
        }

        if (selectedTypeOfTodos === 'done') {
          return todo.title.includes(title) && todo.completed;
        }

        if (selectedTypeOfTodos === 'undone') {
          return todo.title.includes(title) && !todo.completed;
        }

        return false;
      }
    );

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            name="title"
            placeholder="Input ToDo title"
            value={this.state.title}
            onChange={(event) => this.changeHandler(event)}
          />
          <select
            name="selectedTypeOfTodos"
            value={this.state.selectedTypeOfTodos}
            onChange={(event) => this.changeHandler(event)}
          >
            <option value="all">All</option>
            <option value="done">Done</option>
            <option value="undone">Undone</option>
          </select>
          <TodoList
            todos={filteredTodos}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

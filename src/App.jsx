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
    input: '',
    select: 'all',
  };

  componentDidMount() {
    getTodos()
    .then(todos => this.setState({todos: todos.data}));
  }

  selectUser = (newUserId) => (
    this.setState({selectedUserId: newUserId})
  );

  changeHandler = (event) => (
    this.setState({[event.target.name]: event.target.value})
  );

  render() {
    const { todos, selectedUserId } = this.state;
    console.log('select', this.state.select);

    const todosFiltered = todos.filter(
      todo => {
        if (this.state.select === 'all' && todo.title) {
          return todo.title.includes(this.state.input);
        }

        if (this.state.select === 'true' && todo.title) {
          return (todo.title.includes(this.state.input)) && (todo.completed === !!this.state.select);
        }

        if (this.state.select === '' && todo.title) {
          return (todo.title.includes(this.state.input)) && (todo.completed === !!this.state.select);
        }

        return false;
      }
    );
    console.log('todosFiltered', todosFiltered);

    return (
      <div className="App">
        <div className="App__sidebar">
          <input
            name="input"
            placeholder="Input ToDo title"
            value={this.state.input}
            onChange={(event) => this.changeHandler(event)}
          />
          <select
            name="select"
            value={this.state.select}
            onChange={(event) => this.changeHandler(event)}
          >
            <option value="all">All</option>
            <option value="true">Done</option>
            <option value="">Undone</option>
          </select>
          <TodoList
            todos={todosFiltered}
            selectUser={this.selectUser}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                selectedUserId={this.state.selectedUserId}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

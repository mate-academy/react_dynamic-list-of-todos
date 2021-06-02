import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    filter: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  async componentDidUpdate() {
    let todos;
    const { filter } = this.state;

    if (filter === 'all') {
      todos = await getTodos();
    }

    if (filter === 'active') {
      todos = await getTodos()
        .then(result => result.filter(todo => todo.completed === false));
    }

    if (filter === 'completed') {
      todos = await getTodos()
        .then(result => result.filter(todo => todo.completed === true));
    }

    this.pushTodos(todos);
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  pushTodos(todos) {
    this.setState({ todos });
  }

  render() {
    const { todos, selectedUserId, query, filter } = this.state;

    const normalizeQuery = query.toLocaleLowerCase();
    const filtredTodos = todos.filter(
      todo => !!todo.title
      && todo.title.toLocaleLowerCase().includes(normalizeQuery),
    );

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filtredTodos}
            filter={filter}
            handleChange={this.handleChange}
            userId={selectedUserId}
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

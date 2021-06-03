import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';

class App extends React.Component {
  state = {
    todos: [],
    todosFromServer: [],
    selectedUserId: 0,
    query: '',
    filter: 'all',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
    this.setState({ todosFromServer: todos });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  selestChange = (event) => {
    const { name, value } = event.target;
    const { todosFromServer } = this.state;
    let todosSelest = todosFromServer;

    if (value === 'all') {
      todosSelest = todosFromServer;
    }

    if (value === 'active') {
      todosSelest = todosFromServer.filter(todo => todo.completed === false);
    }

    if (value === 'completed') {
      todosSelest = todosFromServer.filter(todo => todo.completed === true);
    }

    this.setState({
      [name]: value,
      todos: todosSelest,
    });
  }

  queryChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
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
            queryChange={this.queryChange}
            selestChange={this.selestChange}
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

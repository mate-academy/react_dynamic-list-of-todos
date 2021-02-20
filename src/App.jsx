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
    query: '',
    todoStatus: '',
  };

  async componentDidMount() {
    const result = await getTodos();

    this.setState({ todos: result.data });
  }

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearUser = () => {
    this.setState({ selectedUserId: 0 });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  getFilteredTodos = () => {
    const { todos, query, todoStatus } = this.state;
    let filteredTodos = [...todos];

    filteredTodos = todos.filter(todo => (todo
      && todo.title && todo.title.toLowerCase()
      .includes(query.toLowerCase())));

    switch (todoStatus) {
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed === true);
        break;

      case 'active':
        filteredTodos = filteredTodos.filter(todo => todo.completed === false);
        break;

      default:
        filteredTodos = [...filteredTodos];
        break;
    }

    return filteredTodos;
  }

  render() {
    const { todos, selectedUserId, query, todoStatus } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          {todos.length > 0 && (
            <TodoList
              todos={this.getFilteredTodos()}
              selectedUserId={selectedUserId}
              query={query}
              todoStatus={todoStatus}
              selectUser={this.selectUser}
              handleChange={this.handleChange}
              randomBtn={this.randomBtn}
            />
          )}
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId !== 0 ? (
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

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
    filterStatus: '',
  };

  async componentDidMount() {
    const todos = await getTodos();

    this.setState({ todos });
  }

  getFilteredTodos = () => {
    const { todos, title, filterStatus } = this.state;

    const filteredTodosByTitle = todos.filter(todo => todo.title
      && todo.title.includes(title));

    let filteredTodosByStatus = filteredTodosByTitle;

    switch (filterStatus) {
      case 'completed':
        filteredTodosByStatus = filteredTodosByTitle
          .filter(todo => todo.completed === true);
        break;

      case 'active':
        filteredTodosByStatus = filteredTodosByTitle
          .filter(todo => todo.completed === false);
        break;

      default:
        filteredTodosByStatus = [...filteredTodosByTitle];
        break;
    }

    return filteredTodosByStatus;
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  }

  selectUser = (id) => {
    this.setState({ selectedUserId: id });
  }

  clear = () => {
    this.setState({ selectedUserId: 0 });
  }

  render() {
    const { selectedUserId, title, filterStatus } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={this.getFilteredTodos()}
            selectUser={this.selectUser}
            selectedUserId={selectedUserId}
            title={title}
            handleChange={this.handleChange}
            filterStatus={filterStatus}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                clear={this.clear}
              />
            ) : `${selectedUserId === null
              ? 'User is not found in our database'
              : 'No user selected'}`}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

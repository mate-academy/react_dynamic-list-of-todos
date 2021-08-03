import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUserByID } from './api';

class App extends React.Component {
  state = {
    todos: [],
    staticTodos: [],
    selectedUserId: 0,
    selectedUser: {},
    todoStatus: '',
    query: '',
  };

  componentDidMount() {
    getTodos()
      .then(response => (
        this.setState({
          todos: response.data,
          staticTodos: response.data,
        })
      ));
  }

  setTodoStatus = ({ target }) => {
    this.setState({
      todoStatus: target.value,
    });

    this.sortTodo(target.value);
  }

  chooseUser = (todoUserId) => {
    getUserByID(todoUserId).then((user) => {
      this.setState(state => ({
        selectedUserId: todoUserId,
        selectedUser: user.data,
      }));
    });
  }

  setSearchQuery = ({ target }) => {
    const { value } = target;

    this.setState({
      query: value,
    });
  };

  clearUserID = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  sortTodo = (value) => {
    let filteredTodos;

    switch (value) {
      case 'completed':
        filteredTodos = this.state.staticTodos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodos = this.state.staticTodos.filter(todo => !todo.completed);
        break;
      default:
        filteredTodos = this.state.staticTodos;
    }

    this.setState({
      todos: filteredTodos,
    });
  };

  render() {
    const
      {
        todos,
        selectedUserId,
        selectedUser,
        todoStatus,
        query,
      }
      = this.state;
    const { setTodoStatus, chooseUser, setSearchQuery, clearUserID } = this;
    const filteredTodo = todos
      .filter(todo => todo.title
        && todo.title.includes(query));

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={filteredTodo}
            chooseUser={chooseUser}
            selectedUserId={selectedUserId}
            todoStatus={todoStatus}
            setTodoStatus={setTodoStatus}
            value={query}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                {...selectedUser}
                clearUserID={clearUserID}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

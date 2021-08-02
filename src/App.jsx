import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';

class App extends React.Component {
  state = {
    todos: [],
    visibleTodos: [],
    selectedUserId: 4,
  };

  componentDidMount() {
    getTodos()
      .then((todosFromServer) => {
        this.setState({
          todos: todosFromServer.filter((todo) => {
            const { userId, title } = todo;

            return userId && title;
          }),
        });
        this.setState(state => ({
          visibleTodos: state.todos,
        }));
      });
  }

  filterTodoByTitle = (query) => {
    this.setState(state => ({
      visibleTodos: state.todos.filter((todo) => {
        const title = todo.title.toLowerCase();

        return title.includes(query);
      }),
    }));
  }

  filterTodosByStatus = (status) => {
    this.setState(state => ({
      visibleTodos: state.todos.filter((todo) => {
        switch (status) {
          case ('not completed'):
            return todo.completed === false;

          case ('completed'):
            return todo.completed === true;

          default:
            return true;
        }
      }),
    }));
  }

  selectUser = (userId) => {
    this.setState({
      selectedUserId: userId,
    });
  }

  render() {
    const { visibleTodos, selectedUserId } = this.state;
    const { filterTodoByTitle, filterTodosByStatus } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            selectedUserId={selectedUserId}
            findTodoByTitle={filterTodoByTitle}
            filterTodosByStatus={filterTodosByStatus}
            selectUser={this.selectUser}
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

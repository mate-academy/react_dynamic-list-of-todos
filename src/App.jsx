import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

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

  filterTodos = (query, status) => {
    this.setState(state => ({
      visibleTodos: state.todos.filter((todo) => {
        const title = todo.title.toLowerCase();
        let isRelevantStatus;

        switch (status) {
          case ('not completed'):
            isRelevantStatus = !todo.completed;
            break;

          case ('completed'):
            isRelevantStatus = todo.completed;
            break;

          default:
            isRelevantStatus = true;
            break;
        }

        return title.includes(query) && isRelevantStatus;
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
    const { filterTodos, selectUser } = this;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={visibleTodos}
            selectedUserId={selectedUserId}
            selectUser={selectUser}
            filterTodos={filterTodos}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                selectUser={selectUser}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

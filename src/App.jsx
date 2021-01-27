import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/todos';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
  };

  componentDidMount() {
    getAllTodos()
      .then(({ data }) => {
        this.setState({
          todos: data.map((item) => {
            if (item.completed === null) {
              return {
                ...item,
                completed: false,
              };
            }

            return { ...item };
          }),
        });
      });
  }

  toggleTodoStatus = (id) => {
    this.setState(state => (
      {
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo, completed: !todo.completed,
            };
          }

          return { ...todo };
        }),
      }

    ));
  };

  selectUser = (userId) => {
    this.setState({ selectedUserId: userId });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todos}
            onSelect={this.selectUser}
            onChange={this.toggleTodoStatus}
          />
        </div>
        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser userId={selectedUserId} onClear={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

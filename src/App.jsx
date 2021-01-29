import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    statusSelected: '',
  };

  componentDidMount() {
    getTodos()
      .then((result) => {
        this.setState({ todos: result.data });
      });
  }

  clearSelectedUserId = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  setSelectedUserId = (result) => {
    this.setState({
      selectedUserId: result,

    });
  }

  onFilterInputChange = (text) => {
    this.setState({
      query: text,
    });
  };

  onSelectInputChange = (status) => {
    this.setState({
      statusSelected: status,
    });
  };

  onCheckChange = (todoId) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos.map(todo => (todo.id === todoId
          ? {
            ...todo, competed: !todo.completed,
          }
          : todo)),
      ],
    }));
  }

  render() {
    const {
      todos,
      selectedUserId,
      query,
      statusSelected,
    } = this.state;

    let todosFiltered = todos
      .filter(todo => (todo
      && todo.title
      && todo.title.includes(query)));

    switch (statusSelected) {
      case 'active':
        todosFiltered = todosFiltered
          .filter(todo => todo.completed === false);
        break;

      case 'completed':
        todosFiltered = todosFiltered
          .filter(todo => todo.completed === true);
        break;

      default:
        todosFiltered = [...todosFiltered];
        break;
    }

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todosFiltered}
            query={query}
            statusSelected={statusSelected}
            onFilterInputChange={this.onFilterInputChange}
            onSelectInputChange={this.onSelectInputChange}
            checkTodo={this.onCheckChange}
            onChange={(userId) => {
              this.setSelectedUserId(userId);
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                userId={selectedUserId}
                onChange={(userId) => {
                  this.clearSelectedUserId(userId);
                }}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

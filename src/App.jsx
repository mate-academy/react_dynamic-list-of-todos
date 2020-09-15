import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    todosFromServer: [],
  };

  componentDidMount() {
    getAllTodos()
      .then((data) => {
        this.setState({
          todos: data,
          todosFromServer: [...data],
        });
      });
  }

  selectUser = (id) => {
    this.setState({
      selectedUserId: id,
    });
  }

  clearUser = () => {
    this.setState({
      selectedUserId: 0,
    });
  }

  filterHandler = (event) => {
    const filteredValue = event.target.value;

    this.setState((state) => {
      const filteredTodos = [...state.todosFromServer].filter((todo) => {
        const { title } = todo;

        return title && title.includes(filteredValue);
      });

      return {
        todos: filteredTodos,
      };
    });
  }

  selectHandler = (event) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case 'active':
        this.setState(state => ({
          todos: [...state.todosFromServer].filter(todo => !todo.completed),
        }));
        break;

      case 'completed':
        this.setState(state => ({
          todos: [...state.todosFromServer].filter(todo => todo.completed),
        }));
        break;

      default:
        this.setState(state => ({
          todos: [...state.todosFromServer],
        }));
    }
  }

  render() {
    const { todos, selectedUserId } = this.state;

    return (
      <>
        <div>
          <input
            placeholder="filter"
            onChange={this.filterHandler}
          />
          <select onChange={this.selectHandler}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="App">
          <div className="App__sidebar">
            <TodoList todos={todos} selectUser={this.selectUser} />
          </div>

          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearUser={this.clearUser}
                />
              ) : 'No user selected'}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;

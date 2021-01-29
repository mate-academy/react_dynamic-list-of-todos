import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAll } from './api';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    query: '',
    statusFilter: 'All',
  };

  componentDidMount() {
    getAll()
      .then((result) => {
        this.setState({
          todos: result.data.filter(todo => todo.title),
        });
      });
  }

  checkTodo = (userId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id !== userId) {
          return item;
        }

        return {
          ...item,
          completed: !item.completed,
        };
      }),
    }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { todos, selectedUserId, query, statusFilter } = this.state;

    const filterByQuery = todo => (
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );

    const filterByStatus = (item) => {
      switch (statusFilter) {
        case 'Active':
          return !item.completed;
        case 'Completed':
          return item.completed;
        default:
          return item;
      }
    };

    const newTodos = todos.filter(filterByQuery).filter(filterByStatus);

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={newTodos}
            changeCheked={this.checkTodo}
            handleChange={this.handleChange}
            selectedUserId={(userId) => {
              this.setState({ selectedUserId: userId });
            }}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">

            {selectedUserId !== 0 ? (
              <CurrentUser
                userId={selectedUserId}
                reset={() => {
                  this.setState({ selectedUserId: 0 });
                }}
              />
            ) : (
              <p>Please select user</p>
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default App;

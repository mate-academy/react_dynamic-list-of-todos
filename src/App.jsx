import React from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api/api';

class App extends React.Component {
  state = {
    todosPublic: [],
    selectedUserId: 0,
    selectedTodo: 0,
    user: null,
  };

  componentDidMount() {
    getTodos()
      .then(result => (
        this.setState({
          todosPublic: result.data.filter(item => item.userId),
          todosSrc: result.data.filter(item => item.userId),
        })
      ));

    getUsers(this.state.selectedUserId)
      .then(result => (
        this.setState({
          user: result,
        })
      ));
  }

  selectedUser = (userId, todoId) => {
    this.setState({
      selectedUserId: userId,
      selectedTodo: todoId,
    });

    getUsers(userId)
      .then(result => (
        this.setState({
          user: result.data,
        })
      ));
  }

  clear = () => {
    this.setState({
      selectedUserId: 0,
      user: null,
      selectedTodo: 0,
    });
  }

  completedTodo = (value) => {
    if (value === 'all') {
      this.setState(state => ({
        todosPublic: state.todosSrc,
      }));

      return;
    }

    this.setState(state => ({
      todosPublic: [...state.todosSrc].filter(todo => (
        value === 'completed'
          ? todo.completed
          : !todo.completed
      )),
    }));
  }

  finder = (value) => {
    this.setState(state => ({
      todosPublic: [...state.todosSrc].filter(todo => (
        todo.title
          ? todo.title.includes(value)
          : ''
      )),
    }));
  }

  randomOrder = () => {
    this.setState(state => ({
      todosPublic: [...state.todosPublic]
        .sort(() => Math.random() - 0.5),
    }));
  }

  render() {
    const { todosPublic, selectedUserId, selectedTodo, user } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todosPublic}
            selectedTodo={selectedTodo}
            selectedUSer={this.selectedUser}
            finder={this.finder}
            completedTodo={this.completedTodo}
            randomOrder={this.randomOrder}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser
                {...user}
                clearedUser={this.clear}
              />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

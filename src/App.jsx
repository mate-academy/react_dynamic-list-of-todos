import React from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos} from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

class App extends React.Component {
  state = {
    todos: [],
    selectedUserId: 0,
    user: [],
    todosCopy: [],
    select: 'All',
  };

  selectUser = (user) => {
    this.setState({
      selectedUserId: user.userId,
    });
  }

  clearUser = () => {
    this.setState({
      user: [],
      selectedUserId: 0,
    })
  }

  componentDidMount() {
    getTodos()
      .then((result) => {
        this.setState({
          todos: result.data,
          todosCopy: result.data,
        })
      })
  }

  updateCompleted = target => {
    this.setState(prevState => ({
      todosCopy: prevState.todosCopy.map(todo => {
        if (todo.id !== Number(target.value)) {
          return {...todo}
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }))
  }

  filterTodos = target => {
    this.setState(prevState => ({
      todosCopy: prevState.todos.filter(el => (
        el.title
          ? el.title.includes(target.value)
          : '' 
      )),
    }));
  }

  handleSelect = target => {
    if (target === 'All') {
      this.setState(prevState =>({todosCopy: prevState.todos}))
    } else if (target === 'Active') {
      this.setState(prevState => ({
        todosCopy: prevState.todos.filter(el => (
          !el.completed
        ))
      }))
    } else if (target === 'Completed') {
      this.setState(prevState => ({
        todosCopy: prevState.todos.filter(el => el.completed)
      }))
    }
  }

  render() {
    const { todosCopy, selectedUserId, user, } = this.state;

    return (
      <div className="App">
        <div className="App__sidebar">
          <TodoList
            todos={todosCopy}
            selectUser={this.selectUser}
            updateCompleted={this.updateCompleted}
            filterTodos={this.filterTodos}
            handleSelect={this.handleSelect}
          />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <CurrentUser user={user} clearUser={this.clearUser} />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

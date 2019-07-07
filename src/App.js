import React from 'react';
import './App.css';
import propTypes from 'prop-types';
import { getTodos, getUsers } from './api/api';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoaded: false,
    isLoading: false,
  };

  async componentDidMount() {
    await getUsers()
      .then((userData) => {
        this.setState(
          { users: userData },
        );
      });
    await getTodos()
      .then((todosData) => {
        this.setState(
          { todos: todosData },
        );
      });
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  render() {
    const todosWithUser = this.state.todos.map(todo => ({
      ...todo,
      user: this.state.users.find(user => user.id === todo.userId),
    }));
    console.log(todosWithUser);
    return (
      <main>
        {this.state.isLoaded ? (
          <div className="App">
            <h1>Static list of todos</h1>
            <TodoList
              todos={todosWithUser}
            />
          </div>
        ) : (
          <button type="submit" onClick={this.handleClick}>
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </main>
    );
  }
}

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <TodoItem todoItem={todo} />
    ))}
  </ul>
);
const TodoItem = ({ todoItem }) => (
  <li>
    <div>
      <input
        type="checkbox"
        checked={todoItem.completed}
      />
      {todoItem.title}
    </div>

    <User user={todoItem.user} />
  </li>
);

const User = ({ user }) => (
  <div>{user.name}</div>
);

propTypes.state = {
  users: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    username: propTypes.string,
    email: propTypes.string,
    address: propTypes.shape({
      street: propTypes.string,
      suite: propTypes.string,
      city: propTypes.string,
    }),
    phone: propTypes.string,
    website: propTypes.string,
    company: propTypes.shape({
      name: propTypes.string,
    }),
  }),
  todos: propTypes.shape({
    userId: propTypes.number,
    id: propTypes.number,
    title: propTypes.string,
    completed: propTypes.boolean,
  }),
};
TodoList.propTypes = {
  todos: propTypes.shape({
    map: propTypes.func,
  }).isRequired,
};
TodoItem.propTypes = {
  todoItem: propTypes.shape({
    completed: propTypes.bool,
    title: propTypes.string,
    user: propTypes.string,
  }).isRequired,
};
User.propTypes = {
  user: propTypes.shape({
    name: propTypes.string,
  }).isRequired,
};
export default App;

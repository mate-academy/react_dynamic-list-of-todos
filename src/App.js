import React from 'react';
import Button from './components/Button';
import TodoList from './components/TodoList';
import './App.css';

class App extends React.Component {
  state = {
    todosWithUsers: null,
    sortedTodos: null,
    direction: true,
    isLoading: false,
    isLoaded: false,
  }

  getData = async() => {
    this.setState({
      isLoading: true,
    });

    const responseTodos = await fetch(
      'https://jsonplaceholder.typicode.com/todos'
    );

    const responseUsers = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    const todos = await responseTodos.json();
    const users = await responseUsers.json();

    const todosWithUsers = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    this.setState({
      todosWithUsers,
      sortedTodos: todosWithUsers,
      isLoading: false,
      isLoaded: true,
    });
  }

  sorting = (field) => {
    const fieldMap = {
      name: (a, b) => a.user.name.localeCompare(b.user.name),
      title: (a, b) => a.title.localeCompare(b.title),
      completed: (a, b) => a.completed - b.completed,
      id: (a, b) => a.id - b.id,
    };

    this.setState(prevState => ({
      direction: !prevState.direction,
      sortedTodos: prevState.direction
        ? [...prevState.todosWithUsers].sort(fieldMap[field])
        : [...prevState.todosWithUsers].sort(fieldMap[field]).reverse(),
    }));
  }

  render() {
    return (
      <div className="common-block">
        {
          this.state.isLoaded
            ? (
              <TodoList
                sorting={this.sorting}
                sortedTodos={this.state.sortedTodos}
              />
            )
            : (
              <Button
                isLoading={this.state.isLoading}
                getData={this.getData}
              />
            )
        }
      </div>
    );
  }
}

export default App;

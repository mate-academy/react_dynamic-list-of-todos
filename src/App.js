import React from 'react';
import Button from './components/Button';
import TodoList from './components/TodoList';

import { todosLink, usersLink, loadData } from './GetData';
import './App.css';

class App extends React.Component {
  state = {
    todosWithUsers: null,
    sortedTodos: null,
    direction: false,
    isLoading: false,
    isLoaded: false,
  }

  getData = async() => {
    this.setState({
      isLoading: true,
    });

    const todos = await loadData(todosLink);
    const users = await loadData(usersLink);

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
    const { sortedTodos, isLoading } = this.state;
    return (
      <div className="common-block">
        {
          this.state.isLoaded
            ? (
              <TodoList
                sortedTodos={sortedTodos}
                sorting={this.sorting}
              />
            )
            : (
              <Button
                isLoading={isLoading}
                getData={this.getData}
              />
            )
        }
      </div>
    );
  }
}

export default App;

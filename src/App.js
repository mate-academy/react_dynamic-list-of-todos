import React from 'react';
import cx from 'classnames';
import './App.css';
import TodoList from './components/TodoList/TodoList';

class App extends React.Component{
  state = {
    active:0,
    todosWithUsers:[],

  }

  loadDatas = () => {
       Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users').then(users => users.json()),
        fetch('https://jsonplaceholder.typicode.com/todos').then(todos => todos.json()),
    ])
    .then(usersAndTodos => {
      this.setState({
        active:1,
        todosWithUsers: usersAndTodos[1].map(todo => ({
          ...todo,
          user: usersAndTodos[0].find(user => user.id === todo.userId),
        }))
      })
    })
  }

  sortAZ = () => {
    this.setState( prevState => ({
      todosWithUsers: [...prevState.todosWithUsers].sort()
    }))
  }

  render () {
    const { todosWithUsers, active } = this.state;
    return (
      <>
        <div className={active === 1 ? 'button-back down' : 'button-back' }>Loading...</div>
        <button
          onClick={this.loadDatas}
          className="button-start"
          type="button"
        >Load</button>
        <button
        type="button"
         onClick={this.sortAZ}
         className="sort"
         >sort A-Z</button>
        <TodoList todos = {todosWithUsers} />
      </>
      )
  }
}






// function getTodosWithUsers(todosParam, usersParam) {
//   return todosParam.map(todo => (
//     {
//       ...todo,
//       user: usersParam.find(user => user.id === todo.userId),
//     }
//   ));
//   }
// const preparedTodos = getTodosWithUsers(todos, users);

export default App;

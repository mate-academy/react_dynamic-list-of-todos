import React from 'react';
import cx from 'classnames';
import './App.css';
import TodoList from './components/TodoList/TodoList';

class App extends React.Component{
  state = {
    active:0,
    activeSort:0,
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

  render () {
    const { todosWithUsers, active, activeSort } = this.state;
    return (
      <>
        <div className={active === 1 ? 'button-back down' : 'button-back' }>Loading...</div>
        <button
          onClick={this.loadDatas}
          className={active === 1 ? 'button-start down' : 'button-start' }
          type="button"
        >Load</button>
        {!!active && (<button
          type="button"
          onClick={this.sortAZ}
          className={activeSort === 1 ? 'sort down' : 'sort' }
        >Title A-Z</button>)}
        <TodoList todos = {todosWithUsers} />
      </>
    )
  }
  sortAZ = () => {
    //console.log(this.state.todosWithUsers.sort((a,b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0 ));
    this.setState(({
      activeSort:1,
      todosWithUsers: this.state.todosWithUsers.sort((a,b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0 ),
    }))
  }
}

export default App;

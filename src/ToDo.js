import React from 'react'
import { getTodos, getUsers } from './todoService'
// import ListItems from './ListItems'
import {
  completedSort,
  titleSort,
  nameSort,
} from './api'

class ToDo extends React.Component {
  state = {
    todos: [],
    load: false,
  }
  async componentDidMount() {
    const [todos, users] = await Promise.all([getTodos(), getUsers()])

    let items = this.getTodoWithUser(users, todos);

    this.setState({
      todos: items,
      load: true,
    })
  }

  sortTodos = (sortField) => {

    if (sortField === 'completed') {
      completedSort(this.state.todos, sortField)
    }
    if (sortField === 'title') {
      titleSort(this.state.todos, sortField)
    } else {
      nameSort(this.state.todos, sortField)
    }

    this.setState({
      todos: this.state.todos
    })
  }

  getTodoWithUser(users, todos) {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId)
    }))
  }

  render() {
    let { todos } = this.state;
    return (
      this.state.load ? <table className="table">
        <thead>
          <tr>
            <th onClick={() => {
              this.sortTodos('completed')
            }}>Done</th>
            <th onClick={() => {
              this.sortTodos('title')
            }}>Todo</th>
            <th onClick={() => {
              this.sortTodos('user')
            }}>User</th>
          </tr>
        </thead>
        <tbody >
          {todos.map(todo => {
            return <tr key={todo.id}>
              <td>
                <input type='checkbox' checked={todo.completed} onChange={() => []} />
              </td>

              <td>
                {todo.title}
              </td>

              <td>
                {todo.user.name}
              </td>
            </tr>
          })}
        </tbody>
      </table>
        : '...Loading'
    )
  }
}

export default ToDo
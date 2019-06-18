import React from 'react';
import TodoItem from './TodoItem';
import '../css/todoList.css'

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      responses: null
    }
    this.sort = this.sort.bind(this);
  }

  componentDidMount() {
    const requests = ['todos', 'users'];
    const data = {};
    
    requests.forEach((item) => {
      const request = new XMLHttpRequest();
      request.open('GET', `https://jsonplaceholder.typicode.com/${item}`);
      request.addEventListener('load', () => {
      data[item] = JSON.parse(request.response);
        if (data.todos && data.users) {
          this.setState({
            loaded: true,
            responses: data
          });
        }
      });
      request.send();
    })
  }

  sort(event) {
    this.setState({
      sortBy: event.target.innerText.toLowerCase()
    });
  }

  render () {
    const todosComponents = [];

    if (this.state.loaded) {
      for (const todoItem of this.state.responses.todos) {
        const isCompleted = todoItem.completed ? 'completed' : 'not completed'
        const user = this.state.responses.users.find(user => user.id === todoItem.userId);
        const userName = user.name;
        const userEmail = user.email;

      todosComponents.push(
        <TodoItem id = {todoItem.id}
          title = {todoItem.title}
          author = {userName}
          email = {userEmail}
          completed = {isCompleted}
          key = {todoItem.id}
         />
      );
    }
    if (this.state.sortBy === 'title' || this.state.sortBy === 'author' || this.state.sortBy === 'completed') {
      todosComponents.sort((a,b) => a.props[this.state.sortBy].localeCompare(b.props[this.state.sortBy]));
    }
  } else {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <table className='table'>
      <thead>
        <tr onClick = {this.sort}>
          <th>id</th>
          <th>Title</th>
          <th>Author</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {todosComponents}
      </tbody>
    </table>
   )
  }
}

export default TodoList;

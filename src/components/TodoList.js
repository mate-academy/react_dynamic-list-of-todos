import React from 'react';
import { TodoItem } from './TodoItem';
import './TodoList.css';

export class TodoList extends React.Component {
  constructor(props) {
    super (props);    
   
    this.state = {
      sortData: this.props.todos.map(item => item)
    }
    this.sortTodos = this.sortTodos.bind(this);
  }

  sortTodos(fieldName) {
    this.fieldName = fieldName;
    this.setState((state) => ({
      sortData: state.sortData.sort((a, b) => a[this.fieldName].localeCompare(b[this.fieldName]))
    }))
  }
  
  render() {
    const {
      sortData
    } = this.state;

    return (
      <table className="todo-list">
        <thead>
          <tr>
            <th onClick={this.sortTodos.bind(this, 'title')}>Title</th>
            <th onClick={this.sortTodos.bind(this, 'completed')}>Is completed</th>
            <th onClick={this.sortTodos.bind(this, 'user')}>Name</th>
          </tr>
        </thead>
        <tbody>
          {sortData.map(todo => (
            <TodoItem
              key={todo.id} 
              title={todo.title} 
              completed={todo.completed} 
              user={todo.user}
            />
          ))}
        </tbody>
      </table>
    )
  }
}

import React from 'react';
import TodoItem from "./TodoItem.js"

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: props.todoList.map((value) => {
        return {
          ...value,
          user: props.userList[props.userList.findIndex((user) => user.id === value.userId)]
        }
      })
    }
  }
  
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
  
  sortTable(query, queryObject) {
    let compare = this.compareBy(query);
    
    this.setState({
      todos: this.state.todos.sort((a, b) => {
        switch(queryObject) {
          case null: {
          return compare(a, b);
          }
          default: {
          return compare(a[queryObject], b[queryObject]);
          }
        }
      })
    })
  }
  
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th onClick={this.sortTable.bind(this, "id", null)}>Id</th>
            <th onClick={this.sortTable.bind(this, "title", null)}>Title</th>
            <th onClick={this.sortTable.bind(this, "completed", null)}>Competed</th>
            <th onClick={this.sortTable.bind(this, "username", "user")}>Username</th>
            <th onClick={this.sortTable.bind(this, "email", "user")}>Email</th>
            <th onClick={this.sortTable.bind(this, "name", "user")}>Name</th>
          </tr>
            {this.state.todos.map((value, index) => {
              return (<TodoItem key={value.id} todo={value}/>)
            })}
        </tbody>
      </table>
    );
  }
}

export default TodoList;

import React, { Component } from "react";
import TodoItem from "./TodoItem";

const peopleDataUrl = "https://jsonplaceholder.typicode.com/users";

class TodoList extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    fetch(peopleDataUrl)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          data: jsonData
        });
      });
  }

  render() {
    return (
      <div className="todo">
        <ul className="todo__PeopleList">
          {this.state.data.map(person => (
            <li className="todo__row" key={person.id}>
              <span>Name: {person.name}</span>
              
              <TodoItem todoData={this.state.todoData} id={person.id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;

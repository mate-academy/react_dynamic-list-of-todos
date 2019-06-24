import React, { Component } from "react";

const todoUrl = "https://jsonplaceholder.typicode.com/todos";

class TodoItem extends Component {
  state = {
    todoData: this.props.todoData,
    buttonText: "(❁´◡`❁)",
    buttonStatus: false
  };

  getUserTodoData = (event, id) => {
    let buttonText;

    this.state.buttonStatus
      ? (buttonText = "(❁´◡`❁)")
      : (buttonText = "((⊙﹏⊙))");

    if (!this.state.buttonStatus) {
      fetch(todoUrl)
        .then(response => response.json())
        .then(jsonData => jsonData.filter(data => data.userId === id))
        .then(filteredData =>
          this.setState(prevState => ({
            todoData: filteredData,
            buttonText: buttonText,
            buttonStatus: !prevState.buttonStatus
          }))
        );
    } else {
      this.setState(prevState => ({
        todoData: null,
        buttonText: buttonText,
        buttonStatus: !prevState.buttonStatus
      }));
    }
  };

  render() {
    return (
      <>
        <button
          className="todo__button-GET"
          type="button"
          onClick={event => this.getUserTodoData(event, this.props.id)}
        >
          {this.state.buttonText}
        </button>
        {this.state.todoData ? (
          <ul className="todo__taskList">
            {this.state.todoData.map(task => (
              <li className="todo__task" key={task.id}>
                <input
                  className="todo__checkbox"
                  type="checkbox"
                  defaultChecked={task.completed}
                />
                {task.title}
              </li>
            ))}
          </ul>
        ) : (
          false
        )}
      </>
    );
  }
}

export default TodoItem;

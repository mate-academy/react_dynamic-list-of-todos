import React from 'react';
import TodoItem from "./TodoItem";

function TodoList(props) {
  let newList = props.list.map(element => {
    let user = props.users.find(user => {
      return user.id === element.userId;
    });
    return (
      <TodoItem key={element.id} item={element.title} name={user.name}
                complete={element.completed ? 'completed' : 'not completed'}/>
    )
  });

  return (
    <table>
      <tbody>
      <tr>
        <td onClick={props.sort}>Title(click to sort)</td>
        <td>User</td>
        <td>Status</td>
      </tr>
      {newList}
      </tbody>
    </table>
  )
}

export default TodoList;

import React from 'react';
import TodoItem from "./TodoItem";


function TodoList(props){
  let newList= props.list.map(e => {
    let user = props.users.find(u => {
      return u.id === e.userId;
    });
    return (
      <TodoItem key={e.id} item={e.title} name={user.name} complete={e.completed ? 'completed' : 'not completed'}/>
    )
  });

  return(
    <table>
    <tbody>
    <tr><td onClick={props.sort}>Title(click to sort)</td><td>User</td><td>Status</td></tr>
    {newList}
    </tbody>
    </table>
  )
}

export default TodoList;

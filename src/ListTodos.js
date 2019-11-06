import React from 'react';

function ListTodos (props) {
  const list = props.list.listTodos;
  const users = props.list.listUsers;
  return (
    <>
      {list.map((item, index) =>
        <tr key={item.id + index}>
          <td>{users.find(user => user.id === item.userId).name}:</td>
          <td>{item.title}</td>
          <td>{item.completed.toString()}</td>
        </tr>
      )}
    </>
  )
}

export default ListTodos;

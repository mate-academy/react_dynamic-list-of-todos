import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import TodoItem from '../TodoItem/TodoItem';
import SortButtons from '../sortButtons/SortButtons';

const TodoTable = ({ todosWithUser, titleSort, userNameSort, completedSort }) => {
  return (
    <>
      <SortButtons
        titleSort={titleSort}
        userNameSort={userNameSort}
        completedSort={completedSort}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Todo item</Table.HeaderCell>
            <Table.HeaderCell>User name</Table.HeaderCell>
            <Table.HeaderCell>Is completed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todosWithUser.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              isCompleted={todo.completed}
              user={todo.user}
            />
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default TodoTable;

import React from 'react';
import { Table } from 'semantic-ui-react';
import User from './User';
import TodoCellCompleted from './TodoCellCompleted';

type PropsTodoItem = Todo;

const TodoItem: React.FC<PropsTodoItem> = ({ id, user, completed, title }) => (
  <Table.Row warning>
    <Table.Cell>{id}</Table.Cell>
    <User {...user} />
    <Table.Cell textAlign="left">{title}</Table.Cell>
    <TodoCellCompleted compl={completed} />
  </Table.Row>
);

export default TodoItem;

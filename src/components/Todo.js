import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import User from './User';
import TodoCellCompleted from './TodoCellCompleted';

const TodoItem = ({ id, user, completed, title }) => (
  <Table.Row warning>
    <Table.Cell>{id}</Table.Cell>
    <User {...user} />
    <Table.Cell textAlign="left">{title}</Table.Cell>
    <TodoCellCompleted compl={completed} />
  </Table.Row>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]),
  ).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;

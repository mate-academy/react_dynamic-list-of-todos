import React from 'react';
import { Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import User from '../User/User';

const TodoItem = ({ title, user, isCompleted }) => (
  <tr>
    <td>{title}</td>
    <User name={user.name} />
    {isCompleted ? (
      <Table.Cell positive>
        <Icon name="checkmark" />
        Completed
      </Table.Cell>
    ) : (
      <Table.Cell negative>
        <Icon name="close" />
        In procces
      </Table.Cell>
    )}
  </tr>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoItem;

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';

ToDoItem.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

function ToDoItem(props) {
  const { user, title, completed } = props.data;
  return (
    <Table.Row>
      {
        completed
          ? (
            <Table.Cell positive textAlign="center">
              <Icon name="checkmark" />
            </Table.Cell>
          )
          : (
            <Table.Cell negative textAlign="center">
              <Icon name="close" />
            </Table.Cell>
          )
      }
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
    </Table.Row>
  );
}

export default ToDoItem;

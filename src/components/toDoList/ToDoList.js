import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'semantic-ui-react';
import ToDoItem from '../toDoItem/ToDoItem';

ToDoList.propTypes = {
  data: PropTypes.shape({
    direction: PropTypes.string.isRequired,
    toDoList: PropTypes.array.isRequired,
    column: PropTypes.string.isRequired,
  }).isRequired,
  sort: PropTypes.func.isRequired,
};

function ToDoList({ data, sort }) {
  const { direction, toDoList, column } = data;
  return (
    <Container>
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'completed' ? direction : null}
              onClick={() => sort('completed')}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'title' ? direction : null}
              onClick={() => sort('title')}
            >
              Task
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'user.name' ? direction : null}
              onClick={() => sort('user.name')}
            >
              Author
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            [...toDoList]
              .map(item => (<ToDoItem key={item.id} data={item} />))
          }
        </Table.Body>
      </Table>
    </Container>
  );
}

export default ToDoList;

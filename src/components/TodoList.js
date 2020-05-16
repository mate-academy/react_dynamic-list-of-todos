import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import Todo from './Todo';

const headers = {
  id: 'Id',
  user: 'Person',
  title: 'Description',
  completed: 'Completed',
};

const TodoList = ({ list }) => {
  const [todos, sortTodos] = useState(list);
  const [active, setActive] = useState('id');
  const [isSorted, setSorted] = useState(true);

  const sortType = (field) => {
    switch (typeof list[0][field]) {
      case 'string':
        return (a, b) => a[field].localeCompare(b[field]);
      case 'object':
        return (a, b) => a[field].name.localeCompare(b[field].name);
      default:
        return (a, b) => a[field] - b[field];
    }
  };

  const sortList = (field) => {
    const callback = sortType(field);

    if (active !== field) {
      sortTodos(todos.sort(callback));
      setActive(field);
      setSorted(true);
    } else {
      isSorted
        ? sortTodos(todos.reverse())
        : sortTodos(todos.sort(callback));
      setSorted(!isSorted);
    }
  };

  return (
    <Table celled className="ui purple inverted" selectable>
      <Table.Header>
        <Table.Row>
          {Object.keys(headers).map(header => (
            <Table.HeaderCell
              className="table__button"
              key={header}
              onClick={() => sortList(header)}
            >
              {headers[header]}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {list.map(todo => <Todo key={todo.id} {...todo} />)}
      </Table.Body>
    </Table>
  );
};

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;

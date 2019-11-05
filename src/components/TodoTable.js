import React from 'react';
import TodoList from './TodoList';

function TodoTable(props) {
  const {
    byTitle,
    byUser,
    byCompleteness,
    initialTable,
  } = props;

  return (
    <>
      <button onClick={byTitle} type="button" className="ui blue basic button start">
        Sort by title
      </button>
      <button onClick={byUser} type="button" className="ui violet basic button">
        Sort by user
      </button>
      <button onClick={byCompleteness} type="button" className="ui purple basic button">
        Sort by completeness
      </button>
      <TodoList initialTable={initialTable} />
    </>
  );
}

export default TodoTable;

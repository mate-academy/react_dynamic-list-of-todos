import React from 'react';
import { todoContext } from '../../contexts/TodoContext';

export const Error: React.FC = () => {
  const { loadTodos } = React.useContext(todoContext);

  return (
    <div className="Error">
      <h2 className="title">An Error Has Ocurred While Fetching Todos!</h2>

      <button type="button" onClick={loadTodos} className="button is-primary">
        Try again
      </button>
    </div>
  );
};

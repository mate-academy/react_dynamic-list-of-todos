import React from 'react';
import { Todo } from '../helpers/api';

type Props = {
  isLoading: boolean;
  errorMessage: string;
  todos: Todo[];
  handleLoadClick: () => void;
};

const LoadingButtons: React.FC<Props> = (
  {
    isLoading, errorMessage, todos, handleLoadClick,
  },
) => {
  return (
    isLoading
      ? (
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          Loading...
        </button>
      )
      : (
        <>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleLoadClick}
            hidden={todos.length !== 0}
          >
            <span role="status" aria-hidden="true" />
            Load
          </button>
          <p
            className="alert alert-primary mt5"
            hidden={errorMessage === ''}
            role="alert"
          >
            {`¯\\_(ツ)_/¯ ${errorMessage}`}
          </p>
        </>
      )
  );
};

export default LoadingButtons;

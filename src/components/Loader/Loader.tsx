import React from 'react';
import './Loader.scss';
// import { TodoContext } from '../../context';

export const Loader: React.FC = () => {
  // const { loading } = useContext(TodoContext);

  return (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
};

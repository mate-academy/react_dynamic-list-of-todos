import React, { useContext } from 'react';
import './Loader.scss';
import { TodoContext } from '../../TodoContext';

const Loader: React.FC = () => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
);

export const ListLoader = () => {
  const { isListLoading } = useContext(TodoContext);

  return (
    <>
      {isListLoading && <Loader />}
    </>
  );
};

export const ModalLoader = () => {
  const { isModalLoading } = useContext(TodoContext);

  return (
    <>
      {isModalLoading && <Loader />}
    </>
  );
};

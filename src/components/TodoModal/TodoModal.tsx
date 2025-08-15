import React from 'react';
import { Todo } from '../../types/Todo';
import { ModalCard } from '../ModalCard';

type Props = {
  modal: boolean;
  selectedTodo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  modal,
  selectedTodo,
  onClose,
}) => {
  return <>{modal && <ModalCard todo={selectedTodo} onClose={onClose} />}</>;
};

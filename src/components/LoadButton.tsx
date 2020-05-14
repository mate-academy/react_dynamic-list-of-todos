import React, { useState } from 'react';

type Props = {
  loadTodos: () => void;
};

export const LoadButton: React.FC<Props> = ({ loadTodos }) => {
  const [title, setTitle] = useState<string>('Load');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loading = () => {
    setTitle('Loading...');
    setIsLoading(true);

    setTimeout(() => {
      loadTodos();
    }, 1000);
  };

  return (
    <button
      type="button"
      className="waves-effect waves-light btn-large"
      disabled={isLoading}
      onClick={loading}
    >
      {title}
    </button>
  );
};

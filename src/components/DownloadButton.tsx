import React from 'react';

interface Props {
  getTodos: () => void;
  isLoading: boolean;
}

export const DownloadButton: React.FC<Props> = ({ getTodos, isLoading }) => (
  <button
    type="button"
    className="get-info"
    onClick={() => getTodos()}
    disabled={isLoading}
  >
    Get all todos
  </button>
);

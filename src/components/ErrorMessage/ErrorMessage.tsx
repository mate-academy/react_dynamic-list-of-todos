import React from 'react';
import './ErrorMessage.scss';

export const ErrorMessage: React.FC = () => (
  <div className="block notification is-danger is-light">
    An error occurred while downloading data from the server
  </div>
);

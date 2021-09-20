import React from 'react';

import './Spinner.scss';

export const Spinner: React.FC = () => (
  <div className="Spinner">
    <div className="lds-roller">
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
      <div>{}</div>
    </div>
  </div>
);

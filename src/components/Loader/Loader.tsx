// Componente Loader — exibe uma animação de carregamento (spinner).
// Deve ser usado sempre que a aplicação está esperando dados do servidor,
// tanto na tela principal (carregando todos) quanto dentro do modal
// (carregando dados do usuário).
import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => (
  <div className="Loader" data-cy="loader">
    <div className="Loader__content" />
  </div>
);

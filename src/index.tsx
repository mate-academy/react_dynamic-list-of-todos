import ReactDOM from 'react-dom';
import { App } from './App';
import { TodoFiltersProvider } from './components/Contex/FilterContex';

ReactDOM.render(
  <TodoFiltersProvider>
    <App />
    ,
  </TodoFiltersProvider>,
  document.getElementById('root'),
);

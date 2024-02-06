import ReactDOM from 'react-dom';
import { App } from './App';
import { TodosContextProvider } from './components/State';

ReactDOM.render(
  <TodosContextProvider>
    <App />
  </TodosContextProvider>,
  document.getElementById('root'),

);

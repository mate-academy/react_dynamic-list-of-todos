import ReactDOM from 'react-dom';
import { App } from './App';
import { TodosProvider } from './contexts/TodoProvider';

const Root = () => (
  <TodosProvider>
    <App />
  </TodosProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);

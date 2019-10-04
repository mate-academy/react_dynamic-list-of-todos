import { connect } from 'react-redux';
import App from './App';
import { receiveTodosAndUsers, sortTodos } from './store/index';

const mapDispatchToProps = dispatch => ({
  receiveTodosAndUsers: () => dispatch(receiveTodosAndUsers()),
  sortTodos: () => dispatch(sortTodos()),
});

const EnhancedApp = connect(
  state => ({
    isLoading: state.isLoading,
    isInitialized: state.isInitialized,
    hasError: state.hasError,
  }),
  mapDispatchToProps,
)(App);

export default EnhancedApp;

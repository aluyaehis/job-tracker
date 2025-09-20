import { BrowserRouter } from 'react-router-dom';
import AppRoute from './AppRoutes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

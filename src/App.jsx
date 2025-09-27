import { BrowserRouter } from 'react-router-dom';
import AppRoute from './AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';

const App = () => {
  return (
    <AuthProvider>
      <JobProvider>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </JobProvider>
    </AuthProvider>
  );
};

export default App;

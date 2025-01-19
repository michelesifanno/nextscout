import { RouterProvider } from 'react-router-dom';
import router from './routes/Routing';
import AppContext from './context/AppContext';
import useAuth from './hooks/useAuth';


function App() {
  return <RouterProvider router={router} />;
}

function WrapperApp() {
  const data = useAuth();
  return (
    <AppContext.Provider value={data}>
      <App />
    </AppContext.Provider>
  );
}

export default WrapperApp;
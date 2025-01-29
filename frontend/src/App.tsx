import { Routes } from './routes';

import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return <AuthProvider>
    <Routes />
    <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
    <Tooltip id="tooltip-controller" />
  </AuthProvider>
}
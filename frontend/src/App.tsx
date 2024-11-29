import ReactDOM from 'react-dom/client'
import { Routes } from './routes';

import { _SampleProvider } from './context/_SampleContext';

export function App() {
  return <_SampleProvider>
        <Routes />
  </_SampleProvider>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
import { Routes } from './routes';

import { _SampleProvider } from './context/_SampleContext';

export function App() {
  return <_SampleProvider>
        <Routes />
  </_SampleProvider>
}
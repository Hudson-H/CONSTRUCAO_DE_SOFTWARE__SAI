import { Routes } from './routes';

import { _SampleProvider } from './context/_SampleContext';

export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

// export function App() {
//   return <_SampleProvider>
//         <Routes />
//   </_SampleProvider>
// }
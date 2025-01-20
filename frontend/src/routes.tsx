import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import { Index } from './views/index/Index';
import { Root } from './components/organisms/Root/Root';

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route element={<Root />}>
      <Route path="/" element={<Index/>}></Route>
    </Route>
  </>)
);

export function Routes() {
  return <RouterProvider router={router}/>;
}
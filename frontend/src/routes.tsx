import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import { Index } from './views/index/Index';

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path="/" element={<Index/>}></Route>
  </>)
);

export function Routes() {
  return <RouterProvider router={router}/>;
}
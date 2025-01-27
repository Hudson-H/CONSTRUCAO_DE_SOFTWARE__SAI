import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import { Dashboard } from './views/dashboard/Dashboard';
import { Root } from './components/organisms/Root/Root';
import { AuthRoot } from './components/organisms/AuthRoot/AuthRoot';
import { Login } from './views/login/Login';
import { Cardapio } from './views/cardapio/Cardapio';
import { Pedido } from './views/pedido/Pedido';

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route element={<AuthRoot />}>
      <Route path="/login" element={<Login/>}></Route>
    </Route>
    <Route element={<Root />}>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/cardapio" element={<Cardapio/>}></Route>
      <Route path="/pedido" element={<Pedido/>}></Route>
    </Route>
  </>)
);

export function Routes() {
  return <RouterProvider router={router}/>;
}
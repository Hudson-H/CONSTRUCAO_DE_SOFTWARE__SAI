import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import { Dashboard } from './views/dashboard/Dashboard';
import { Root } from './components/organisms/Root/Root';
import { AuthRoot } from './components/organisms/AuthRoot/AuthRoot';
import { Login } from './views/login/Login';
import { Cardapio } from './views/cardapio/Cardapio';
import { Pedido } from './views/pedido/Pedido';
import { Estoque } from './views/estoque/Estoque';
import { NovoItemCardapio } from './views/cardapio/item/novo/NovoItemCardapio';

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route element={<AuthRoot />}>
      <Route path="/login" element={<Login/>}></Route>
    </Route>
    <Route element={<Root />}>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/cardapio">
        <Route path="" element={<Cardapio/>}></Route>
        <Route path="item">
          <Route path="novo" element={<NovoItemCardapio/>}></Route>
        </Route>
      </Route>
      <Route path="/pedido" element={<Pedido/>}></Route>
      <Route path="/estoque" element={<Estoque/>}></Route>

      <Route path="cardapio/item/novo"></Route>
    </Route>
  </>)
);

export function Routes() {
  return <RouterProvider router={router}/>;
}
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
import { EditarItemCardapio } from './views/cardapio/item/editar/EditarItemCardapio';
import { NovoSecaoCardapio } from './views/cardapio/secao/novo/NovoSecaoCardapio';
import { EditarSecaoCardapio } from './views/cardapio/secao/editar/EditarSecaoCardapio';
import { NovoAdicionalCardapio } from './views/cardapio/adicional/novo/NovoAdicionalCardapio';
import { EditarAdicionalCardapio } from './views/cardapio/adicional/editar/EditarAdicionalCardapio';
import { NovoItemEstoque } from './views/estoque/Item/novo/NovoItemEstoque';
import { EditarItemEstoque } from './views/estoque/Item/editar/EditarItemEstoque';
import { EditarCategoriaEstoque } from './views/estoque/categoria/editar/EditarCategoriaEstoque';
import { NovoCategoriaEstoque } from './views/estoque/categoria/novo/NovoCategoriaEstoque';
import { NovoLancamentoEstoque } from './views/estoque/lancamento/novo/NovoLancamentoEstoque';
import { EditarLancamentoEstoque } from './views/estoque/lancamento/editar/EditarLancamentoEstoque';
import { NovoTipoUnidadeEstoque } from './views/estoque/tipo-unidade/novo/NovoTipoUnidadeEstoque';
import { EditarTipoUnidadeEstoque } from './views/estoque/tipo-unidade/editar/EditarTipoUnidadeEstoque';
import { NovoPedido } from './views/pedido/novo/NovoPedido';

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
          <Route path=":id" element={<EditarItemCardapio/>}></Route>
        </Route>
        <Route path="secao">
          <Route path="novo" element={<NovoSecaoCardapio/>}></Route>
          <Route path=":id" element={<EditarSecaoCardapio/>}></Route>
        </Route>
        <Route path="adicional">
          <Route path="novo" element={<NovoAdicionalCardapio/>}></Route>
          <Route path=":id" element={<EditarAdicionalCardapio/>}></Route>
        </Route>
      </Route>
      <Route path="/pedido">
        <Route path="" element={<Pedido/>}></Route>
        <Route path="novo" element={<NovoPedido/>}></Route>
      </Route>
      <Route path="/estoque">
        <Route path="" element={<Estoque/>}></Route>
        <Route path="item">
          <Route path="novo" element={<NovoItemEstoque/>}></Route>
          <Route path=":id" element={<EditarItemEstoque/>}></Route>
        </Route>
        <Route path="categoria">
          <Route path="novo" element={<NovoCategoriaEstoque/>}></Route>
          <Route path=":id" element={<EditarCategoriaEstoque/>}></Route>
        </Route>
        <Route path="lancamento">
          <Route path="novo" element={<NovoLancamentoEstoque/>}></Route>
          <Route path=":id" element={<EditarLancamentoEstoque/>}></Route>
        </Route>
        <Route path="tipo-unidade">
          <Route path="novo" element={<NovoTipoUnidadeEstoque/>}></Route>
          <Route path=":id" element={<EditarTipoUnidadeEstoque/>}></Route>
        </Route>
      </Route>

      <Route path="cardapio/item/novo"></Route>
    </Route>
  </>)
);

export function Routes() {
  return <RouterProvider router={router}/>;
}
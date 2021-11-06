import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Categoria from './pages/categoria/Categoria';
import Produto  from './pages/produto/Produto';
import Cadastrar from './pages/cadastrar/CadastrarFornecedor';

export default function Routes(){
      return(
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
            </Route>
            <Route path="/categorias" component={Categoria}/>
            <Route path="/produtos" component={Produto}/>
            <Route path="/cadastrar" component={Cadastrar}/>
          </Switch>
        </BrowserRouter>
      )
  }

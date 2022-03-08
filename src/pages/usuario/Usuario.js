import React, {Component} from 'react';
import './styles.css';

export default class Usuario extends Component {
  state = {
    id: "",
    login: "",
    nome: "",
    senha: "",
    senhaRepete: "",
    tipoUsuario: "",
    usuarios: [],
    usuariosFiltro: [],
    busca: ""
  };  

  txtlogin_change = (event) => {
    this.setState({login: event.target.value});
  };
  txtNome_change = (event) => {
    this.setState({nome: event.target.value});
  };
  txtSenha_change = (event) => {
    this.setState({senha: event.target.value});
  };
  txtSenhaRepete_change = (event) => {
    this.setState({senhaRepete: event.target.value});
  };
  txtBusca_change = (event) => {
    this.setState({busca: event.target.value});
  };

  verificaCampos(){
    var str = ''
    if(this.state.nome == ''){
        str += '- Insira o nome.\n'
    }
    if(this.state.login == ''){
        str += '- Insira o login.\n'
    }
    if(this.state.senha == ''){
        str += '- Insira a senha.\n'
    }
    if(this.state.senhaRepete == ''){
        str += '- Insira a senha repetida.\n'
    }
    if(this.state.senha != this.state.senhaRepete){
        str += '- As senhas devem ser iguais.'
    } 
    if(str != ''){
        alert(str);
        return false;
    }else{
        return true;
    }
  }

  gravar = () => {
    const camposVazios = this.verificaCampos()
    if(camposVazios == true){
        let data = {
            "login": this.state.login,
            "nome": this.state.nome,
            "senha": this.state.senha,
            "id": this.state.id
        };
        let requestOptions ={}

        if(this.state.id == ""){
            requestOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            };
        }else{
            requestOptions = {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            };
        }

        const url = "http://localhost:8080/usuario/";

        fetch(url,requestOptions)
        .then(this.get_usuarios())
        .then(this.limpar_campos())
        .catch(erro => console.log(erro));
    }
  }

  alterar(usuario){
    this.setState({login: usuario.login});
    this.setState({nome: usuario.nome});
    this.setState({senha: usuario.senha});
    this.setState({senhaRepete: usuario.senha});
    this.setState({id: usuario.id});
  }

  excluir = (id) => {
      let data = {
          "id": id
      };
      let requestOptions ={}

      requestOptions = {
          method: "DELETE",
          headers: {
          "content-type": "application/json"
          },
          body: JSON.stringify(data)
      };

      const url = "http://localhost:8080/usuario/";

      fetch(url,requestOptions)
      .then(this.get_usuarios())
      .then(this.limpar_campos())
      .catch(erro => console.log(erro));
  }

  limpar_campos = () => {
    this.setState({login: ""});
    this.setState({nome: ""});
    this.setState({senha: ""});
    this.setState({senhaRepete: ""});
    this.setState({id: ""});
  }

  componentDidMount(){
    this.get_usuarios()
  }

  get_usuarios(){
    const url = "http://localhost:8080/usuario/";
    fetch(url)
    .then(response => response.json().then(data => {
        this.setState({usuarios: data});
    }))
    .catch(erro => console.log(erro));
  }

  renderTela(lista){
    return (
    <div className="p-0 m-0 pe-5 ps-5 pb-2">
      <div className="bg-white rounded-5 box-shadow p-3 mt-3">
        <div className="p-4 fw-bolder text-center fs-4"> 
          Cadastrar Usuários
        </div>

        <div>
          <input type="hidden" value={this.state.id} ></input>
          <div className="p-1">
            <input required value={this.state.login} onChange={this.txtlogin_change} className="form-control" placeholder="Login" type="text"></input>
          </div>
          <div className="p-1">
            <input required value={this.state.nome} onChange={this.txtNome_change} className="form-control" placeholder="Nome" type="text"></input>
          </div>
          <div className="p-1">
            <input required value={this.state.senha} onChange={this.txtSenha_change} className="form-control" placeholder="Senha" type="password"></input>
          </div>
          <div className="p-1">
            <input required value={this.state.senhaRepete} onChange={this.txtSenhaRepete_change} className="form-control" placeholder="Senha Repetida" type="password"></input>
          </div>
          <div className="p-1">
            <select required value={this.state.tipoUsuario} onChange={this.txtTipoUsuario_change} className="form-control">
              <option value="">Selecione</option>
              <option value="fornecedor">Fornecedor</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
        </div>

        <div className="p-3 text-center">
          <button onClick={this.gravar} className="col-12 col-md-3">Cadastrar</button>
        </div>
      </div>
      { lista }

    </div>
    )
  }

  renderLista = () => {
    return (
      <div className="bg-white rounded-5 shadow-lg p-3 mt-5">
        <div className="p-4 fw-bolder text-center fs-4"> 
            Listagem de Usuários
        </div>

        <div className="d-flex">
          <div className="p-2 ps-3 col-8"> 
              Quantidade de usuários cadastrados: {this.state.usuarios.length}
          </div>
          <div className="p-2 col-4 d-flex shadow li">
            <input className="form-control none" value={this.state.busca} onChange={this.txtBusca_change} placeholder="Buscar" type="search"></input>
            <button className="col-2" onClick={this.buscar}>
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        <div className="p-1">
          <div className="d-flex pb-2 pe-3 ps-3">
            <div className="col">Nome</div>
            <div className="col text-center">E-mail</div>
            <div className="col text-end">Opções</div>
          </div>
          <ul className="list-group col-12">
            {this.state.usuarios.map(usuario => {
              return (
                <li key={usuario.id} className="shadow d-flex li">
                  <div className="col">{usuario.nome}</div>
                  <div className="col text-center">{usuario.login}</div>
                  <div className="col text-end">
                      <button className="col-12 col-md-4" onClick={()=>this.alterar(usuario)}>Alterar</button>
                      <button className="col-12 col-md-4" onClick={()=>this.excluir(usuario.id)}>Excluir</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }

  renderListaFiltro(){
    this.state.usuariosFiltro = []

    this.state.usuarios.map(
      usuario => {
        if(!usuario.nome.indexOf(this.state.busca)){
          this.state.usuariosFiltro.push(usuario)
        }
      }
    )
    
    return (
      <div className="bg-white rounded-5 shadow-lg p-3 mt-5">
        <div className="p-4 fw-bolder text-center fs-4"> 
            Listagem de Usuários
        </div>

        <div className="d-flex">
          <div className="p-2 ps-3 col-8"> 
              Quantidade de usuários cadastrados: {this.state.usuariosFiltro.length}
          </div>
          <div className="p-2 col-4 d-flex shadow li">
            <input className="form-control none" value={this.state.busca} onChange={this.txtBusca_change} placeholder="Buscar" type="search"></input>
            <button className="col-2" onClick={this.buscar}>
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        <div className="p-1">
          <div className="d-flex pb-2 pe-3 ps-3">
            <div className="col">Nome</div>
            <div className="col text-center">E-mail</div>
            <div className="col text-end">Opções</div>
          </div>
          <ul className="list-group col-12">
            {this.state.usuariosFiltro.map(usuario => {
              return (
                <li key={usuario.id} className="shadow d-flex li">
                  <div className="col">{usuario.nome}</div>
                  <div className="col text-center">{usuario.login}</div>
                  <div className="col text-end">
                      <button className="col-12 col-md-4" onClick={()=>this.alterar(usuario)}>Alterar</button>
                      <button className="col-12 col-md-4" onClick={()=>this.excluir(usuario.id)}>Excluir</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

    render(){
      if(this.state.busca == ""){
        return this.renderTela(this.renderLista())
      }else{
        return this.renderTela(this.renderListaFiltro())
      }
    }
}

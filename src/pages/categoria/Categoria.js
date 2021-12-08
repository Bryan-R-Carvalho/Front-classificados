import React, { Component } from 'react';
import './styles.css';

export default class Categoria extends Component {
    state = {
        id: "",
        nome: "",
        categorias:[],
        incluindo:true,
        alterando: false
    }

    txtId_change = (event) =>{
        this.setState({ id: event.target.value})
    }
    txtNome_change = (event) =>{
        this.setState({nome: event.target.value})
    }

    preencherLista = () => {
        const url = window.servidor + '/categorias/'
        fetch(url)
        .then(response => response.json().then(data => {
            this.setState({categorias: data})
        }))
    }

    componentDidMount(){
        this.preencherLista()
    }

    iniciarNovo = () => {
        this.setState({incluindo: true, nome: ''})
    }
    iniciarAlterar = (categoria) => {
        this.setState({incluindo: false, alterando: true, id:categoria.id, nome: categoria.nome})
    }
    
    gravarNovo = () => {
        const dados = {
            "nome": this.state.nome 
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        
        body: JSON.stringify(dados)
        };
        const url = window.servidor + '/categorias/'
        
        fetch(url, requestOptions)
            .then(resp => {
                this.setState({incluindo: true});
                this.preencherLista();
            })
            .catch(erro => console.log(erro))
    }

    gravarAlterar = (categoria) => {
        const dados = {
            "id":this.state.id,
            "nome": this.state.nome 
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };
        const url = window.servidor + '/categorias/'
        
        fetch(url, requestOptions)
            .then(resp => {
                this.setState({alterando: false, incluindo:true})
                this.preencherLista()
            })
            .catch(erro => console.log(erro))
    }

    excluir = (categoria) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const url = window.servidor + "/categorias/" + categoria.id
        fetch(url, requestOptions)
            .then(this.preencherLista())
            .catch(erro => console.log(erro))
    }

    renderIncluir = () => {
        return (
            
            <div className="container-fluid"> 
                
                <div className="container-xl pb-4 ">
                    <h2 className="d-inline m-auto ">Lista de categorias</h2>            
                    <br/>
                    <table className="table ">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                            </tr>
                        </thead>
                    </table>
                
                    <ul className="list-group overflow-auto ">
                    {this.state.categorias && this.state.categorias.map(categoria => {
                            return <li className="list-group-item " key={categoria.id}>
                                    <div className="row">
                                        <div className="col-sm-4 ml-5">{categoria.id}</div>
                                        <div className="col-sm-2 mr-5">{categoria.nome}</div>
                                        <button type="button"  className="btn col-2 mx-5 btn-outline-primary btn-block " onClick={() => this.iniciarAlterar(categoria)}>ALTERAR</button>
                                        <button type="button"  className="btn col-2  btn-outline-danger btn-sm" onClick={() => this.excluir(categoria)}>EXCLUIR</button>
                                    </div>
                            </li>
                        })}
                    </ul> 
                    
                </div>
            <div className="container-sm ">
                <h2 className="d-inline m-auto ">Cadastrar categorias</h2>
                <form  className="row flex px-5">
                    <input value={this.state.nome} onChange={this.txtNome_change} type="text" className="col-lg form-control-lg" placeholder="Nome"/>
                    <button type="button" className="btn col-sm mx-5 btn-outline-primary btn-sm" onClick={() => this.gravarNovo()}>SALVAR</button>
                </form>
            
            </div>
        </div>
        )
    }

    renderAlterar = () => {
        return (
            <div className="container-fluid "> 
                <div className="container-xl containerCategoria pb-4 ">
                    <h2 className="d-inline m-auto ">Lista de categorias</h2>            
                    <br/>
                    <table className="table ">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                            </tr>
                        </thead>

                    </table>
                
                    <ul className="list-group overflow-auto ">
                    {this.state.categorias && this.state.categorias.map(categoria => {
                            return <li className="list-group-item " key={categoria.id}>
                                    <div className="row">
                                        <div className="col-sm-4 ml-5">{categoria.id}</div>
                                        <div className="col-sm-2 mr-5">{categoria.nome}</div>
                                        <button type="button"  className="btn col-2 mx-5 btn-outline-primary btn-block " onClick={() => this.iniciarAlterar(categoria)}>ALTERAR</button>
                                        <button type="button"  className="btn col-2  btn-outline-danger btn-sm" onClick={() => this.excluir(categoria)}>EXCLUIR</button>
                                    </div>
                            </li>
                        })}
                    </ul> 
                    
            </div>
            <div className="container-sm ">
                <h2 className="d-inline m-auto ">Cadastrar categorias</h2>
                <form  className="row flex px-5 ">
                    <input value={this.state.nome} onChange={this.txtNome_change} type="text" className="col-lg form-control-lg" placeholder="Nome"/>
                    <button type="button" className="btn col-sm mx-5 btn-outline-primary btn-sm" onClick={() => this.gravarAlterar()}>SALVAR</button>
                    <button type="button" className="btn col-sm btn-outline-secondary btn-sm" onClick={() => this.iniciarNovo()}>DESFAZER</button>
                </form>
            
            </div>
        </div>
        )
    }

    render() {
        let pagina = ''
        
        if(this.state.incluindo){
            pagina = this.renderIncluir()
        }else{
            if (this.state.alterando){
                pagina = this.renderAlterar()
            }
        }
        return pagina
    }
}
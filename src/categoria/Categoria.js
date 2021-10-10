import React, { Component } from 'react';
import './styles.css';

export default class Categoria extends Component {
    state = {
        id: "",
        nome: "",
        categorias:[]
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
            .then(res => res.json())
            .then(data => this.setState({categorias: data}))
    }

    componentDidMount(){
        this.preencherLista()
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
            .then(this.preencherLista())
            .catch(erro => console.log(erro))
    }

    renderExibirLista = () => {
        return (
            <div className="container-fluid "> 
                <div className="container pb-4 ">
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
                                        <button type="button" className="btn col p-0  btn-outline-primary ">ALTERAR</button>
                                    <button type="button" className="btn col  p-0 btn-outline-primary">EXCLUIR</button>
                                    </div>
                            </li>
                        })}

                    {/* <button type="button" className="btn btn-primary pb-5 " data-toggle="modal" data-target="#exampleModal">Criar categoria</button>*/}
                    </ul> 
                    {/* MOdal */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title">Criar categoria</h3>
                                    <button type="button" className="close" data-dismiss="modal">
                                        <span>X</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input type="text" className="form-control-sm "  placeholder="Nome da categoria"/>
                                    
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn ml-3 btn-outline-primary" onClick={() => this.gravarNovo()}>SALVAR</button>
                                </div>
                                
                            </div>
                        
                        </div>
                    </div>
                    {/* MOdal */}
                    
            </div>
            <div className="container-form ">
                <h2 className="d-inline m-auto ">Cadastrar categorias</h2>
                <form  className="row ">
                    <input value={this.state.nome} onChange={this.txtNome_change} type="text" className="col form-control-sm" placeholder="Nome"/>
                    <button type="button" className="btn btn-outline-primary" onClick={() => this.gravarNovo()}>SALVAR</button>
                </form>
            
            </div>
        </div>
        )
    }
    render() {
        return this.renderExibirLista()       
    }
}
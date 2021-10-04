import React, { Component } from 'react';
import './styles.css';

export default class Categoria extends Component {
    state = {
        id: "",
        nome: ""
    }

    txtId_change = (event) =>{
        this.setState({ id: event.target.value})
    }
    txtNome_change = (event) =>{
        this.setState({ nome: event.target.value})
    }
    
    gravarNovo = () =>{
        const dados = {
            "id": this.state.id,
            "nome": this.state.nome
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        
        body: JSON.stringify(dados)
        };
        const url = "http://localhost:8080/categorias/gravar"
        
        fetch(url, requestOptions)
            .then(console.log('gravado'))
            .catch(erro => console.log(erro))
    }

    render(){
        return(
            <body >
              <div className="container">
                <h2>Lista de categorias</h2>
                <div className="row">
                    <div className="col ">ID</div>
                    <div className="col">NOME</div>
                    <form  >
                        <input type="text" className="form"  placeholder="Buscar categoria"/>
                    </form>
                </div>
                <div className="container-item">
                    <div className="row mt-2">
                        <div className="col-2">ID:</div>
                        <div className="col-2">Nome:</div>
                        <button type="button" className="btn btn-outline-primary ">ALTERAR</button>
                        <button type="button" className="btn btn-outline-primary">EXCLUIR</button>
                    </div>
                
                </div>
              </div>
              <div className="container-form ">
                <h2>Cadastrar categorias</h2>
                    <form  className="row">
                        <input value={this.state.id} onChange={this.txtId_change} type="text" className="form" placeholder="id"/>
                        <input value={this.state.nome} onChange={this.txtNome_change} type="text" className="form" placeholder="Nome"/>
                        <button type="button" class="btn" onClick={() => this.gravarNovo()}>SALVAR</button>
                        <button type="button" class="btn">DESFAZER</button>
                    </form>
                
              </div>

            </body>
        )
    }
}
import React, { Component } from 'react';
import './styles.css';

export default class Produto extends Component {
    state = {
        id: "",
        nome: "",
        aprovado:false,
        descricao:"",
        disponibilidade:false,
        justificativa:"",
        categoriaId:"",
        produtos:[],
        categorias: [],
        categoria: 1,
        incluindo:true,
        alterando: false
    }

    cbocat_change = (event) =>{
        this.setState({categoria: event.target.value})
    }
    carregar_categorias = () => {
        const url = 'http://localhost:8080/categorias'
        fetch(url)
        .then(res => res.json())
        .then(data => this.setState({categorias: data}))
    }

    componentDidMount = () => {
        this.carregar_categorias();
    }
    
    render() {
        return(
        <div className="container h-75 w-75 d-grid">
            <h2 className="d-inline m-auto justify-content-center ">Cadastro de produtos</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Nome do produto</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="" placeholder="Nome"/>
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="exampleInputPassword1">Categoria</label>
                    <select className="form-select" onChange={this.cbocat_change}>
                         { this.state.categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                         ))}
                    </select>
                </div>
 
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1 ">Aprovado</label>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Sim</label>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Não</label>
                </div>
            
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Disponibilidade</label>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Sim</label>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Não</label>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            
        </div>
        )
    }
   
}
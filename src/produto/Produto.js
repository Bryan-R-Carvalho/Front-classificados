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
        categorias:[],
        incluindo:true,
        alterando: false
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
                    <select className="form-control" id="exampleFormControlSelect1"> { this.state.categorias.map(categoria => {
                            return <option className="list-group-item " key={categoria.id}></option>})}</select>
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
import React, { Component } from 'react';
import './styles.css';


export default class BuscarProduto extends Component {
    state = {
        id: "",
        nome: "",
        produtos: [],
        produtosFiltrados: []
    }

    txtNome_change = (event) => {
        this.setState({ nome: event.target.value });
    };

    buscar() {
        this.state.produtos.map(produto => {
            if (produto.nome.indexOf(this.state.nome)) {
                this.state.produtosFiltrados.push(produto)
            }
        })
    }

    preencherLista = () => {
        const url = 'http://localhost:8080/produtos/'
        fetch(url)
            .then(response => response.json().then(data => {
                this.setState({ produtos: data })
            }))
            .catch(erro => console.log(erro))

    }

    componentDidMount = () => {
        this.preencherLista();
    }

    renderTela() {
        return (
            <div className="p-0 m-0 pe-5 ps-5 pb-2">
                <div className="bg-white rounded-5 box-shadow p-3 mt-3">
                    <div className="p-4 fw-bolder text-center fs-4">
                        Buscar Produto
                    </div>

                    <div>
                        <div className="p-1">
                            <input required value={this.state.nome} onChange={this.txtnome_change} className="form-control" placeholder="Nome Produto" type="text"></input>
                        </div>
                    </div>

                    <div className="p-3 text-center">
                        <button onClick={this.buscar} className="col-12 col-md-3">Buscar</button>
                    </div>
                </div>

                <div className="bg-white rounded-5 d-flex box-shadow p-3 mt-3">
                    {this.state.produtosFiltrados.map(produto => {
                        return (
                            <div className="p-4 col-4 fw-bolder text-center">
                                {produto.id} - {produto.nome}
                            </div>
                        )
                    })}
                </div>
            </div>


        )
    }

    render() {
        return this.renderTela()
    }
}
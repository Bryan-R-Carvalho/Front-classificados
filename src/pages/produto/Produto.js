import React, { Component } from 'react';
import './styles.css';

export default class Produto extends Component {
    state = {
        id: "",
        nome: "",
        aprovado: false,
        descricao: "",
        disponibilidade: false,
        justificativa: "",
        categoriaId: "",
        produtos: [],
        categorias: [],
        categoria: 1,
        incluindo: false,
        alterando: false,
        exibindo: true //mostrar a lista
    }

    iniciarNovo = () => {
        this.setState({
            incluindo: true,
            alterando: false,
            exibindo: false,
            nome: "",
            descricao: "",
            categoria: 1,
            aprovado: false,
            disponibilidade: false,
            justificativa: "",
        })
    }

    iniciarAlterar = (produto) => {
        this.setState({
            incluindo: false,
            alterando: true,
            exibindo: false,
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            categoriaId: produto.categoriaId,
            aprovado: produto.aprovado,
            disponibilidade: produto.disponibilidade,
            justificativa: produto.justificativa,
        })
    }
    iniciarExibir = () => {
        this.setState({ incluindo: false, alterando: false, exibindo: true })
    }

    txtnomeChange = (event) => {
        this.setState({ nome: event.target.value })
    }
    cbocatChange = (event) => {
        this.setState({ categoriaId: event.target.value })
    }
    comboAprovadoChange = (event) => {
        this.setState({ aprovado: event.target.value })
    }
    comboDispChange = (event) => {
        this.setState({ disponibilidade: event.target.value })
    }
    txtDescChange = (event) => {
        this.setState({ descricao: event.target.value })
    }
    txtJustChange = (event) => {
        this.setState({ justificativa: event.target.value })
    }

    preencherLista = () => {
        const url = window.servidor + '/produtos/'
        fetch(url)
            .then(response =>
                response.json().then(data => {
                    this.setState({ produtos: data })
                })
            )
            .catch(erro => console.log(erro))

    }

    componentDidMount = () => {
        this.preencherLista();
        this.carregarCategorias();
    }

    carregarCategorias = () => {
        const url = window.servidor + '/categorias/'
        fetch(url)
            .then(response =>
                response.json().then(data => {
                    this.setState({ categorias: data });
                })
            )
            .catch(erro => console.log(erro))

    }

    gravarNovo = () => {
        //console.log(this.state)
        const dados = {
            "nome": this.state.nome,
            "aprovado": false,
            "descricao": this.state.descricao,
            "disponibilidade": false,
            "justificativa": this.state.justificativa,
            "categoriaId": this.state.categoriaId,
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(dados)
        };
        const url = window.servidor + '/produtos/'

        fetch(url, requestOptions)
            .then(fim => {
                this.setState({ incluindo: false });
                this.preencherLista();
            })
            .catch(erro => console.log(erro))
    }

    gravarAlterar = (categoria) => {
        console.log(this.state)
        const dados = {
            "nome": this.state.nome,
            "descricao": this.state.descricao,
            "categoriaId": this.state.categoriaId,
        }

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        };
        const url = window.servidor + '/produtos/' + this.state.id;

        fetch(url, requestOptions)
            .then(resp => {
                this.setState({ alterando: false, exibindo: true })
                this.preencherLista()
            })
            .catch(erro => console.log(erro))
    }


    excluir = (produto) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const url = window.servidor + "/produtos/" + produto.id
        fetch(url, requestOptions)
            .then(resp => {
                console.log("deletado");
                this.preencherLista();
            }).catch(erro => console.log(erro))

    }

    renderExibirLista = () => {
        return (
            <div className="fundo container-fluid d-grid" >
                <div className="container-xl d-grid bg-white h-75 w-100 p-auto ">
                    <h2 className="d-inline m-auto  ">Lista de produtos</h2>
                    <br />
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col-2" scope="col">Nome</th>
                                <th className="col-2" scope="col">Categoria</th>
                                <th className="col-2" scope="col">Disponibilidade</th>
                                <th className="col-3" scope="col">Aprovado</th>
                                <th className="col-3" scope="col">Alteraçoes</th>
                            </tr>
                        </thead>
                    </table>

                    <ul className="list-group overflow-auto">
                        {this.state.produtos && this.state.produtos.map(produto => {
                            return <li className="list-group-item " key={produto.id}>
                                <div className="row">
                                    <div className="col-2">{produto.nome}</div>
                                    <div className="col-2">{produto.categoria.nome}</div>
                                    <div className="col-2">{produto.disponibilidade ? "SIM" : "NÃO"}</div>
                                    <div className="col-2 btn-group" role="group" aria-label="Basic radio toggle button group" >
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="aprovacao"
                                            id="btnradio1Aprov"
                                            autoComplete="off"
                                            value={this.state.aprovado}
                                        />
                                        <label
                                            className="btn btn-outline-primary"
                                            htmlFor="btnradio1Aprov"
                                        >sim</label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="aprovacao"
                                            id="btnradio2Aprov"
                                            value={this.state.aprovado}
                                            autoComplete="off"
                                        />
                                        <label
                                            className="btn btn-outline-primary"
                                            htmlFor="btnradio2Aprov"
                                        >Não</label>
                                    </div>
                                    {/*<div className="col ms-5 ps-5">{produto.aprovado? "SIM" : "NÃO"}</div>*/}

                                    <div className="col btn-group">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() => this.iniciarAlterar(produto)}
                                        >
                                            Alterar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => this.excluir(produto)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                    <button
                        type="button"
                        className="btn col-2  btn-outline-primary btn-sm"
                        onClick={() => this.iniciarNovo()}
                    >
                        Novo produto
                    </button>
                </div>
            </div>
        )
    }
    renderIncluir = () => {
        return (
            <div className="fundo container-fluid d-grid" >
                <div className="container-xl d-grid bg-white p-auto">
                    <h2 className="m-auto">Cadastro de produtos</h2>
                    <form>
                        <div className="form-group pb-2 ">
                            <label type="text" className="col-sm-2 ">
                                Nome do produto
                            </label>
                            <input
                                value={this.state.nome}
                                onChange={this.txtnomeChange}
                                className="form-control-sm mx-3 col-sm-3"
                                placeholder="Nome"
                            />
                        </div>
                        <div className="form-group pb-2">
                            <label className="col-sm-2" >Categoria</label>
                            <select
                                className="form-select-lg mx-3 col-sm-2"
                                onChange={this.cbocatChange}
                            >
                                <option disabled value="">
                                    ---
                                </option>
                                {this.state.categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}

                            </select>
                        </div>
                        {/* <label className="pe-2 ">Aprovado</label>
                                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="aprovacao" id="btnradio1Aprov" autoComplete="off" value={this.state.aprovado}  />
                                    <label className="btn btn-outline-primary" for="btnradio1Aprov">sim</label>

                                    <input type="radio" className="btn-check" name="aprovacao" id="btnradio2Aprov" value={this.state.aprovado} autoComplete="off" defaultChecked/>
                                    <label className="btn btn-outline-primary" for="btnradio2Aprov">Não</label>
                                </div>

                                <label className="pe-2 ps-5">Disponibilidade</label>
                                <div className="btn-group pb-2" role="group" aria-label="Basic radio toggle button group ">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1Dispo" value={this.state.disponibilidade} autoComplete="off" />
                                    <label className="btn btn-outline-primary" for="btnradio1Dispo">sim</label>

                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2Dispo" value={this.state.disponibilidade} autoComplete="off" defaultChecked/>
                                    <label 
                                    className="btn btn-outline-primary" 
                                    for="btnradio2Dispo"
                                    >Não</label>
                                                (event) => { event.preventDefault(); this.gravarNovo() }
                        </div>*/}

                        <div className="form-group pb-1 ">
                            <label className="col-sm-2" >Descrição</label>
                            <textarea
                                value={this.state.descricao}
                                onChange={this.txtDescChange}
                                className="form-control-sm mx-3 pe-5 pb-2"
                                placeholder="Descreva o produto"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary px-5"
                            onClick={this.state.incluindo ? () => this.gravarNovo() : () => this.gravarAlterar()}
                        >
                            Enviar
                        </button>
                        <button
                            type="button"
                            className="btn col-2 btn-outline-primary btn-sm"
                            onClick={() => this.iniciarExibir()}
                        >
                            Mostrar lista de produtos
                        </button>
                    </form>

                </div>
            </div>
        )
    }
    render() {
        let pagina = ''

        if (this.state.incluindo) {
            pagina = this.renderIncluir()
        } else {
            if (this.state.exibindo) {
                pagina = this.renderExibirLista()
            } else {
                if (this.state.alterando) {
                    pagina = this.renderIncluir()
                }
            }
        }
        return pagina
    }
}
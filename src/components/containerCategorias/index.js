import React, { Component } from 'react';

 class containerCategorias extends Component {
    render(){
        return     <div className="container-xl pb-4 ">
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
        </div>
    }
}
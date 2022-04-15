import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import './styles.css';

export default function AprovarFornecedor() {

    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        async function carregarFornecedor() {
            const response = await api.get('/fornecedor/');

            setFornecedores(response.data);
        }
        carregarFornecedor();
    }, []);

    async function aprovarFornecedor(f) {

        const data = {
            id: f.id,
            nome: f.nome,
            telefone: f.telefone,
            whatsapp: f.whatsapp,
            site: f.site,
            instagram: f.instagram,
            endereco: f.endereco,
            delivery: f.delivery,
            aprovado: true,
        };


        try {
            await api.put("/fornecedor/", JSON.stringify(data));
            setFornecedores(fornecedores.filter(fornecedor => fornecedor.id !== f.id));
        } catch (err) {
            alert("Erro ao aprovar o fornecedor, tente novamente");
        }
    }


    return (
        <div className="fornecedor-container">
            <header>
                <span>Lista de fornecedores</span>
            </header>
            <h1>Aprovar Fornecedores</h1>
            <ul>
                {fornecedores.filter(fornecedor => fornecedor.aprovado === false).map(fornecedor => (
                    <li Key={fornecedor.id}>
                        <div className="group">
                            <strong>Fornecedor:</strong>
                            <p>{fornecedor.nome}</p>
                        </div>

                        <div className="group">
                            <strong>Telefone:</strong>
                            <p>{fornecedor.telefone}</p>
                        </div>

                        <div className="group">
                            <strong>Whatsapp:</strong>
                            <p>{fornecedor.whatsapp}</p>
                        </div>

                        <div className="group">
                            <strong>Site:</strong>
                            <p>{fornecedor.site}</p>
                        </div>

                        <div className="group">
                            <strong>Instagram:</strong>
                            <p>{fornecedor.instagram}</p>
                        </div>

                        <div className="group">
                            <strong>Endereço:</strong>
                            <p>{fornecedor.endereco}</p>
                        </div>

                        <div className="group">
                            <strong>Delivery:</strong>
                            <p>{fornecedor.delivery ? "Sim" : "Não"}</p>
                            <button onClick={() => aprovarFornecedor(fornecedor)} type="button">Aprovar</button>
                        </div>

                    </li>
                ))}
            </ul>


        </div>
    );
}

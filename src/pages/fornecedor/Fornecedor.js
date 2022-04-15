import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import './styles.css';

export default function Fornecedor() {

    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        async function carregarFornecedor() {
            const response = await api.get('/fornecedor/');

            setFornecedores(response.data);
        }
        carregarFornecedor();
    }, []);


    return (
        <div className="fornecedor-container">
            <header>
                <span>Lista de fornecedores</span>
            </header>
            <h1>Fornecedores</h1>
            <ul>
                {fornecedores.map(fornecedor => (
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
                        </div>
                    </li>
                ))}
            </ul>


        </div>
    );
}

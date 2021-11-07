import React, {useState, useEffect} from 'react';

import api from '../../services/api';
import './styles.css';

export default function Fornecedor() {

    const [fornecedores, setFornecedores] = useState([]);

    useEffect(()=> {
        async function carregarFornecedor(){
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
                    <li>
                        <strong>Fornecedor:</strong>
                        <p>{fornecedor.nome}</p>
                        <strong>Telefone:</strong>
                        <p>{fornecedor.telefone}</p>
                        <strong>Whatsapp:</strong>
                        <p>{fornecedor.whatsapp}</p>
                        <strong>Site:</strong>
                        <p>{fornecedor.site}</p>
                        <strong>Instagram:</strong>
                        <p>{fornecedor.instagram}</p>
                        <strong>Endereço:</strong>
                        <p>{fornecedor.endereco}</p>
                        <strong>Delivery:</strong>
                        <p>{fornecedor.delivery ? "Sim" : "Não"}</p>
                    </li>
                ))}
        </ul>

        
    </div>
  );
}

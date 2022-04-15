import React, { useState } from 'react';

import api from '../../services/api';
import './styles.css';
import logo from './logo.png';
import { useHistory } from 'react-router';

export default function Cadastrar() {

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [site, setSite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [senha, setSenha] = useState('');
  const [confsenha, setConfSenha] = useState('');

  const history = useHistory();

  function BuscaEndereco(){
    var endereco_retorno = "'";
    fetch("https://viacep.com.br/ws/"+cep+"/json/")
    .then(res => res.json())
    .then(res => {
      endereco_retorno = res.logradouro + ' - ' + res.bairro + ' - ' + res.localidade + '/' + res.uf
    })
    .then(r => {
      setEndereco(endereco_retorno)
    })
  }

  async function Cadastrar(e) {
    e.preventDefault();

    const data = {
      nome,
      telefone,
      whatsapp,
      site,
      instagram,
      endereco,
      delivery,
      aprovado: false,
      senha
    };

    try {
      await api.post('/fornecedor/', JSON.stringify(data))
      alert(`Cadastro realizado com sucesso! Bem-vindo ${data.nome}!`);
      history.push('/');
    } catch (err) {
      alert('Falha ao cadastrar')
    }
  }

  return (
    <div className="cadastrar-container">
      <main>
        <div id="welcome">
          <img src={logo} alt="logo" />
          <h4>Bem-vindo ao Classificados</h4>
          <h5>apenas em alguns clicks e nós começamos</h5>
        </div>
        <div id="cadastrar">
          <strong>Cadastrar</strong>
          <form onSubmit={Cadastrar}>
            <div id="form">
              <div>
                <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
              </div>
              <div>
                <input type="tel" className="form-control" placeholder="Telefone" aria-label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required />
              </div>
              <div>
                <input type="tel" className="form-control" placeholder="Whatsapp" aria-label="Whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required />
              </div>
              <div>
                <input type="text" className="form-control" placeholder="Site" aria-label="Site" value={site} onChange={e => setSite(e.target.value)} required />
              </div>
              <div>
                <input type="text" className="form-control" placeholder="Instagram" aria-label="Instagram" value={instagram} onChange={e => setInstagram(e.target.value)} required />
              </div>
              <div>
                <input type="text" className="form-control" placeholder="CEP" onBlur={BuscaEndereco} value={cep} onChange={e => setCep(e.target.value)} required />
              </div>
              <div>
                <input type="text" className="form-control" placeholder="Endereço" aria-label="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} required />
              </div>
              <div>
                <input type="password" className="form-control" placeholder="Senha" aria-label="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
              </div>
              <div>
                <input type="password" className="form-control" placeholder="Confirmar senha" aria-label="Confirmar senha" value={confsenha} onChange={e => setConfSenha(e.target.value)} required />
              </div>
              <div>
                <input type="checkbox" className="form-chkbox" checked={delivery} onChange={e => setDelivery(e.target.checked)} />
                <label for="deivery" className="form-chkbox">Realiza delivery?</label>
              </div>
            </div>
            <div id="buttons">
              <button type="submit" className="primary">Cadastrar</button>
              <h6>Já possui um cadastro?</h6>
              <button type="button" className="secondary">Entrar</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

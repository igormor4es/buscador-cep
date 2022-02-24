import { useReducer, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css'
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){

    let cep = input.replace(/\D/g, '');

    if(input != ""){

      let validacep = /^[0-9]{8}$/;

      if(validacep.test(cep)){
        try{

          const response = await api.get(`${input}/json/`);    
          console.log(response.data);
          setCep(response.data);
          setInput("");

          if(response.data.erro){
            throw new Error("CEP não encontrado!");
          }
        }
        catch (error){
          alert(error.message);
          setInput("");
        }
      }else{
        alert("Formato de CEP inválido!");
        setInput("");
      }
    }else{
      alert("Digite um CEP!");
    }
  }

  return (
    <div className="container">
        <h1 className="title">Buscar CEP</h1>
        <div className="containerInput">
            <input 
              id="cep"
              type="text"
              placeholder="Digite o seu CEP..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="buttonSearch" onClick={handleSearch}>
              <FiSearch siz={25} color="#FFF" />
            </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro} - {cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}

    </div>
  );
}

export default App;

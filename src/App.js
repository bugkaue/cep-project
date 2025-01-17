import { useState } from 'react';
import { FiSearch} from 'react-icons/fi'
import './styles.css'
import api from './services/api'
function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState('')


  async function handleSearch() {
    // 013109/json/

    if(input === ''){
      alert('Preencha algum cep!')
    }

    try{
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput('')

    }catch {
      alert('Error searching try again...')
      setInput('')

    }
  }


  return (
    <div className="container">
      <h1 className='title'>Cep Search</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>
      {Object.keys(cep).length > 0 &&(
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>ddd: {cep.ddd}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}

    </div>
  );
}

export default App;

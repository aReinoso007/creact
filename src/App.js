import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [cuentaBancaria, setCuentaBancaria] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState(0);
  const [tipoTransaccion, setTipoTransaccion] = useState('');
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
    'Access-Control-Allow-Methods' :'GET, POST, OPTIONS, PUT, DELETE'
  }

  const [lista, setLista] = useState([]);

  const addTransaccion = () =>{
    Axios.post('http://localhost:3003/transferir', {
      descripcion, 
      monto, 
      tipoTransaccion, 
      cuentaBancaria
    }, {
      headers: headers
    }).then((response)=>{
      console.log('respuesta: ', response.data[0]);
    });
  }

  const getTransacciones = () => {
    Axios.get('http://localhost:3003/transacciones',  {
      headers: headers
    }).then((response)=>{
      console.log('respuesta: ', response);
      setLista(response.data);
    });
  }

  return (
    <div className="App">
      <div className="information">
      <label>Cuenta Bancaria </label>
      <input type="numer" onChange ={(event)=> 
        {setCuentaBancaria(event.target.value)}} 
        />

      <label>Descripcion</label>
      <input type="text"  onChange ={(event)=> 
        {setDescripcion(event.target.value)}} 
        />

      <label>Monto</label>
      <input type="numer"  onChange ={(event)=> 
        {setMonto(event.target.value)}} 
        />

      <label>Tipo Transaccion</label>
      <input type="text"  onChange ={(event)=> 
        {setTipoTransaccion(event.target.value)}} 
        />
      <button onClick={addTransaccion}>Transferir</button>
      </div>
      <div className="listaTransacciones">
        <button onClick={getTransacciones}>Listar Transacciones</button>
        {lista.map((val, key)=>{
          return <div className='lista'>
            <h3>Descripcion: {val.DESCRIPCION}</h3>
            <h3>Fecha: {val.FECHATRANSACCION}</h3>
            <h3>Tipo: {val.TIPORANSACCION}</h3>
            <h3>Monto: {val.MONTO}</h3>
            <h3>Cuenta: {val.CUENTA_NUMERO}</h3>
            </div>
        })}
      </div>
      <hr />

    </div>
  );
}

export default App;

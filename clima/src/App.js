import React, { Fragment, useEffect, useState } from 'react';
import Clima from './component/Clima';
import Error from './component/Error';
import Formulario from './component/Formulario';
import Header from './component/Header';

function App() {
  const [consultar, setConsultar ] = useState(false);
  const [error, setError ] = useState(false);
  const [resultado, setResultado ] = useState({});
  const [busqueda, saveBusqueda ] = useState({ciudad: '',pais: ''});
  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarApi = async () => {
      if(consultar){
        let appId = '553b62de12dadd18a1f608fd3b2e655c';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const response = await fetch(url);
        const result = await response.json();
        setResultado(result);
        setConsultar(false);

        if(resultado.cod === "404"){
          setError(true);
        }else{
          setError(false);
        }
      }
    }
    consultarApi()
  },[consultar, ciudad, pais, resultado.cod]);

  let componente;
  if(error){
    componente = <Error mensaje="no hay resultados" />
  }else{
    componente = <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario busqueda={busqueda} saveBusqueda={saveBusqueda} setConsultar={setConsultar} />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

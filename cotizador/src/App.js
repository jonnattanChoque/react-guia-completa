import styled from '@emotion/styled';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import { useState } from 'react';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;
const ContenedorFormulario = styled.div`
  background-color: #ffffff;
  padding: 3rem;
`;

function App() {
  const [cargando, setCargando] = useState(false);
  const [resumen, saveResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  });

  const { cotizacion, datos } = resumen;

  return (
    <Contenedor>
      <Header titulo="Cotizador" />
      <ContenedorFormulario>
        <Formulario saveResumen={saveResumen} setCargando={setCargando} />
        {cargando ? <Spinner /> : null }
        {!cargando ? <Resumen datos={datos} /> : null}
        {!cargando ? <Resultado cotizacion={cotizacion} /> : null}
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;

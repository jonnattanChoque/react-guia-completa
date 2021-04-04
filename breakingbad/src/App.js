import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Frase from './components/Frase';

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`;
const Boton = styled.button`
  background: linear-gradient(#007d35 0%, #007d35 40%, #0f574c 100%);
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: background-size .5s ease;

  :hover {
    cursor: pointer;
    background-size: 400px;
  }
`;

function App() {
  const [frase, setFrase] = useState({});

  useEffect(() => {
    consultarApi()
  }, []);

  const consultarApi =  async() => {
    //consumir apis con fetch
    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    const fraseApi = await api.json();
    setFrase(fraseApi[0]);
  }

  return (
    <Contenedor>
      <Frase frase={frase} />
      <Boton onClick={() => consultarApi()}>Obtener frase</Boton>
    </Contenedor>
  );
}

export default App;
